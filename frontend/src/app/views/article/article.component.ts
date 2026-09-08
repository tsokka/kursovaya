import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../shared/services/article.service";
import {environment} from "../../../environments/environment";
import {CommentService} from "../../shared/services/comment.service";
import {AuthService} from "../../core/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ArticleType,
  ArticleDetailType,
  CommentType,
  CommentsResponseType,
  CommentActionType,
  CommentReactionType,
  DefaultResponseType
} from "../../../types";


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article!: ArticleDetailType;
  relatedArticles: ArticleType[] = [];
  serverStaticPath = environment.serverStaticPath;
  comments: CommentType[] = [];
  commentsCount: number = 0;
  isCommentsLoading: boolean = false;
  isLogged: boolean = false;
  commentForm = this.fb.group({
    text: ['', [Validators.required]]
  });
  userActions: { [commentId: string]: CommentReactionType } = {};
  shareVkUrl: string = '';
  shareFbUrl: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private commentService: CommentService,
              private authService: AuthService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: ArticleDetailType) => {
          this.article = data;
          this.comments = data.comments || [];
          this.commentsCount = data.commentsCount || 0;
          this.setShareLinks();
          if (this.isLogged) {
            this.loadUserActions();
          }
        });

      this.articleService.getRelatedArticles(params['url'])
        .subscribe((data: ArticleType[]) => {
          this.relatedArticles = data;
        });
    });
  }

  get hasMoreComments(): boolean {
    return this.comments.length < this.commentsCount;
  }

  loadMoreComments(): void {
    this.isCommentsLoading = true;
    this.commentService.getComments(this.comments.length, this.article.id)
      .subscribe({
        next: (data: CommentsResponseType) => {
          this.comments = this.comments.concat(data.comments);
          this.commentsCount = data.allCount;
          this.isCommentsLoading = false;
        },
        error: () => {
          this.isCommentsLoading = false;
        }
      });
  }

  addComment(): void {
    if (!this.commentForm.valid || !this.commentForm.value.text) {
      this._snackBar.open('Введите текст комментария');
      return;
    }

    this.commentService.addComment(this.commentForm.value.text, this.article.id)
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data.error) {
            this._snackBar.open(data.message);
            return;
          }
          this.commentForm.reset();
          this._snackBar.open('Комментарий добавлен');
          this.reloadComments();
        },
        error: () => {
          this._snackBar.open('Ошибка при добавлении комментария');
        }
      });
  }

  private reloadComments(): void {
    this.commentService.getComments(0, this.article.id)
      .subscribe((data: CommentsResponseType) => {
        this.comments = data.comments;
        this.commentsCount = data.allCount;
      });
  }

  private loadUserActions(): void {
    this.commentService.getArticleCommentActions(this.article.id)
      .subscribe((data: CommentActionType[] | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          return;
        }
        this.userActions = {};
        (data as CommentActionType[]).forEach(item => {
          this.userActions[item.comment] = item.action;
        });
      });
  }

  isActionActive(commentId: string, action: 'like' | 'dislike'): boolean {
    return this.userActions[commentId] === action;
  }

  applyAction(comment: CommentType, action: 'like' | 'dislike'): void {
    if (!this.isLogged) {
      this._snackBar.open('Чтобы голосовать, войдите в личный кабинет');
      return;
    }

    const previous = this.userActions[comment.id];

    this.commentService.applyAction(comment.id, action)
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data.error) {
            this._snackBar.open(data.message);
            return;
          }

          if (previous === action) {
            delete this.userActions[comment.id];
            action === 'like' ? comment.likesCount-- : comment.dislikesCount--;
          } else {
            this.userActions[comment.id] = action;
            action === 'like' ? comment.likesCount++ : comment.dislikesCount++;
            if (previous === 'like') {
              comment.likesCount--;
            } else if (previous === 'dislike') {
              comment.dislikesCount--;
            }
          }

          this._snackBar.open('Ваш голос учтен');
        },
        error: () => {
          this._snackBar.open('Ошибка при голосовании');
        }
      });
  }

  applyViolate(comment: CommentType): void {
    if (!this.isLogged) {
      this._snackBar.open('Чтобы пожаловаться, войдите в личный кабинет');
      return;
    }

    this.commentService.applyAction(comment.id, 'violate')
      .subscribe({
        next: (data: DefaultResponseType) => {
          this._snackBar.open(data.error ? 'Жалоба уже отправлена' : 'Жалоба отправлена');
        },
        error: () => {
          this._snackBar.open('Жалоба уже отправлена');
        }
      });
  }

  setShareLinks(): void {
    const pageUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.article.title);

    this.shareVkUrl = `https://vk.com/share.php?url=${pageUrl}&title=${title}`;
    this.shareFbUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  }
}

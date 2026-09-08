import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService, CommentService, TypeGuardUtil} from "../../shared";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../core";
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
  protected _article!: ArticleDetailType;
  protected _relatedArticles: ArticleType[] = [];
  protected _comments: CommentType[] = [];
  protected _commentsCount: number = 0;
  protected _isCommentsLoading: boolean = false;
  protected _isLogged: boolean = false;
  protected _shareVkUrl: string = '';
  protected _shareFbUrl: string = '';
  protected readonly _serverStaticPath: string = environment.serverStaticPath;
  protected readonly _commentForm = this.fb.group({
    text: ['', [Validators.required]]
  });
  private _userActions: { [commentId: string]: CommentReactionType } = {};

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly articleService: ArticleService,
              private readonly commentService: CommentService,
              private readonly authService: AuthService,
              private readonly fb: FormBuilder,
              private readonly _snackBar: MatSnackBar) {
    this._isLogged = this.authService.getIsLoggedIn();
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: ArticleDetailType) => {
          this._article = data;
          this._comments = data.comments || [];
          this._commentsCount = data.commentsCount || 0;
          this._setShareLinks();
          if (this._isLogged) {
            this._loadUserActions();
          }
        });

      this.articleService.getRelatedArticles(params['url'])
        .subscribe((data: ArticleType[]) => {
          this._relatedArticles = data;
        });
    });
  }

  protected get _hasMoreComments(): boolean {
    return this._comments.length < this._commentsCount;
  }

  protected _loadMoreComments(): void {
    this._isCommentsLoading = true;
    this.commentService.getComments(this._comments.length, this._article.id)
      .subscribe({
        next: (data: CommentsResponseType) => {
          this._comments = this._comments.concat(data.comments);
          this._commentsCount = data.allCount;
          this._isCommentsLoading = false;
        },
        error: () => {
          this._isCommentsLoading = false;
        }
      });
  }

  protected _addComment(): void {
    if (!this._commentForm.valid || !this._commentForm.value.text) {
      this._snackBar.open('Введите текст комментария');
      return;
    }

    this.commentService.addComment(this._commentForm.value.text, this._article.id)
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data.error) {
            this._snackBar.open(data.message);
            return;
          }
          this._commentForm.reset();
          this._snackBar.open('Комментарий добавлен');
          this._reloadComments();
        },
        error: () => {
          this._snackBar.open('Ошибка при добавлении комментария');
        }
      });
  }

  private _reloadComments(): void {
    this.commentService.getComments(0, this._article.id)
      .subscribe((data: CommentsResponseType) => {
        this._comments = data.comments;
        this._commentsCount = data.allCount;
      });
  }

  private _loadUserActions(): void {
    this.commentService.getArticleCommentActions(this._article.id)
      .subscribe((data: CommentActionType[] | DefaultResponseType) => {
        if (TypeGuardUtil.isDefaultResponse(data)) {
          return;
        }

        this._userActions = {};
        data.forEach(item => {
          this._userActions[item.comment] = item.action;
        });
      });
  }

  protected _isActionActive(commentId: string, action: CommentReactionType): boolean {
    return this._userActions[commentId] === action;
  }

  protected _applyAction(comment: CommentType, action: CommentReactionType): void {
    if (!this._isLogged) {
      this._snackBar.open('Чтобы голосовать, войдите в личный кабинет');
      return;
    }

    const previous = this._userActions[comment.id];

    this.commentService.applyAction(comment.id, action)
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data.error) {
            this._snackBar.open(data.message);
            return;
          }

          if (previous === action) {
            delete this._userActions[comment.id];
            action === 'like' ? comment.likesCount-- : comment.dislikesCount--;
          } else {
            this._userActions[comment.id] = action;
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

  protected _applyViolate(comment: CommentType): void {
    if (!this._isLogged) {
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

  private _setShareLinks(): void {
    const pageUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this._article.title);

    this._shareVkUrl = `https://vk.com/share.php?url=${pageUrl}&title=${title}`;
    this._shareFbUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  }
}

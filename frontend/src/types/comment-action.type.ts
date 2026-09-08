export type CommentReactionType = 'like' | 'dislike';

export type CommentActionEnumType = CommentReactionType | 'violate';

export type CommentActionType = {
  comment: string,
  action: CommentReactionType
}

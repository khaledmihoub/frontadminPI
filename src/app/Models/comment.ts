import { Post } from "./post";

export class Comment {
    idComment?:number
    text?: string
    date?:Date
    post? : Post
    parent?: Comment;
    replies: Comment[];
    showReplies?: boolean;
}

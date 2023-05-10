import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../Models/post';
import { Router } from '@angular/router';
import { PostService } from '../services/Post/post.service';
import { CommentService } from '../services/Comment/comment.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Comment } from '../Models/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts?: Post[]; 
  comments?: Comment[];
  show = 0;
  @ViewChild('myModal') myModal: ModalDirective;

  constructor(private postService: PostService  , private commentService : CommentService,
    private router: Router) { }

   ngOnInit(): void {
    this.getPosts();
  }
  private getPosts(){
 
    this.postService.getPostsList().subscribe(data => {
      this.posts = data;
    
    });
  
  }

  PostDetails(id: number){
    console.log(id);
    this.commentService.getCommentsByPost(id).subscribe(data => {
      this.comments= data;
    });
    this.myModal.show();
  } 

 
    toggleReplies(comment: Comment) {
      comment.showReplies = !comment.showReplies;
      this.commentService.getCommentsByPost(comment.post.idPost).subscribe(data => {
        this.comments= data;
      });
    }
   
  

  

  deletePost(id: number){
    if (window.confirm('Are you sure you want to delete this post?')) {
    this.postService.deletePost(id).subscribe( data => {
      console.log(data);
      this.getPosts();
    
    })}
  }

}

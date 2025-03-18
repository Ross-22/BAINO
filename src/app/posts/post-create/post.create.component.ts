import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector: 'post-create',
  templateUrl: './post.create.component.html',
  styleUrls: ['./post.create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = ''; // ✅ Bind to the form input
  enteredContent = ''; // ✅ Bind to the form textarea
  public mode = 'create';
  private postId: string | null = null;
  public post: Post = { id: '', title: '', content: '' };
  isLoading = false; // ✅ Show spinner while fetching data

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');

        this.isLoading = true; // ✅ Show spinner while fetching post

        this.postsService.getPost(this.postId!).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };

          // ✅ Update form fields with post data
          this.enteredTitle = postData.title;
          this.enteredContent = postData.content;

          setTimeout(() => {
            this.isLoading = false; // ✅ Hide spinner after delay
          }, 1000);
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.mode === "create") {
      this.postsService.addPost(form.value.title, form.value.content)
        .subscribe(() => {
          setTimeout(() => {
            this.isLoading = false;
            this.postsService.getPosts();
          }, 1000);
        });
    } else {
      this.postsService.updatePost(this.postId!, form.value.title, form.value.content)
        .subscribe(() => {
          setTimeout(() => {
            this.isLoading = false;
            this.postsService.getPosts();
          }, 1000);
        });
    }

    form.resetForm();
  }
}

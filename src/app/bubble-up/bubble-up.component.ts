import { Component,OnInit  } from '@angular/core';

@Component({
  selector: 'app-bubble-up',
  templateUrl: './bubble-up.component.html',
  styleUrls: ['./bubble-up.component.scss']
})
export class BubbleUpComponent implements OnInit  {
    posts: any[] = [];

  currentUserId = 'user-123'; // ← Set your logged-in user ID
  newPost = {
    content: '',
    image: '',
    file: null
  };

  previewUrl: string | null = null;

  // FAB drag variables
  isDragging = false;
  offsetX = 0;
  offsetY = 0;

  ngOnInit() {
    const stored = localStorage.getItem('communityPosts');
    this.posts = stored ? JSON.parse(stored) : [];
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
     // this.newPost.file = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitPost() {
    const post = {
      userId: this.currentUserId,
      userName: 'You',
      time: new Date().toLocaleString(),
      userImage: 'https://via.placeholder.com/40',
      content: this.newPost.content,
      image: this.previewUrl
    };

    this.posts.push(post);
    localStorage.setItem('communityPosts', JSON.stringify(this.posts));

    this.newPost = { content: '', image: '', file: null };
    this.previewUrl = null;

    const modalEl = document.getElementById('postModal');
    //const modalInstance = bootstrap.Modal.getInstance(modalEl!);
    //modalInstance?.hide();
  }

  // Dragging FAB logic
  startDrag(event: MouseEvent, element: HTMLElement) {
    this.isDragging = true;
    this.offsetX = event.clientX - element.getBoundingClientRect().left;
    this.offsetY = event.clientY - element.getBoundingClientRect().top;
  }

  onDrag(event: MouseEvent, element: HTMLElement) {
    if (!this.isDragging) return;
    element.style.left = `${event.clientX - this.offsetX}px`;
    element.style.top = `${event.clientY - this.offsetY}px`;
    element.style.right = 'unset';
    element.style.bottom = 'unset';
    element.style.position = 'fixed';
  }

  stopDrag() {
    this.isDragging = false;
  }
}
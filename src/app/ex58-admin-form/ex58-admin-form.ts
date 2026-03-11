import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ex58Service } from '../services/ex58.service';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-ex58-admin-form',
  imports: [CommonModule, FormsModule, NgxEditorModule],
  templateUrl: './ex58-admin-form.html',
  styleUrl: './ex58-admin-form.css',
})
export class Ex58AdminForm implements OnInit {
  fashion: any = { title: '', style: 'Casual', thumbnail: '', details: '' };
  fashionId: string = '';
  isEdit = false;
  saving = false;
  error = '';

  styles = ['Casual', 'Formal', 'Sport'];

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['bullet_list', 'ordered_list'],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right'],
    ['blockquote', 'code'],
    ['undo', 'redo'],
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Ex58Service
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.fashionId = this.route.snapshot.paramMap.get('id') || '';
    if (this.fashionId) {
      this.isEdit = true;
      this.service.getById(this.fashionId).subscribe({
        next: (data) => { this.fashion = data; },
        error: () => { this.error = 'Không tìm thấy Fashion.'; }
      });
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  submit(): void {
    this.saving = true;
    const op = this.isEdit
      ? this.service.update(this.fashionId, this.fashion)
      : this.service.create(this.fashion);
    op.subscribe({
      next: () => this.router.navigate(['/ex58-admin-list']),
      error: () => { this.saving = false; this.error = 'Lưu thất bại. Vui lòng thử lại.'; }
    });
  }

  cancel(): void { this.router.navigate(['/ex58-admin-list']); }
}

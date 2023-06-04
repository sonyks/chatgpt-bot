import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatService } from '../../services/chat-service.service';
import { ChatWithBot, PersonType } from '../../models/gpt-response.model';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent {
  customerSupportForm!: FormGroup;
  chatConversation: ChatWithBot[] = [];
  responseLoading = false;
  botName: PersonType = 'Customer Support';

  @ViewChild('chatRef', { read: ElementRef }) chatRef!: ElementRef;

  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  sendChatGptRequest(): void {
    const promptText = this.customerSupportForm.get('promptText')!.value;
    if (!promptText) {
      return;
    }

    this.responseLoading = true;
    this.chatConversation.push({
      person: 'You',
      response: promptText,
      fromUser: true,
    });
    this.customerSupportForm
      .get('promptText')
      ?.setValue('', { emitEvent: false });
    this.scrollChat();

    this.chatService.chat(promptText).subscribe((response) => {
      this.responseLoading = false;
      this.chatConversation.push({
        person: this.botName,
        response: response,
        fromUser: false,
      });
      this.scrollChat();
    });
  }

  private scrollChat(): void {
    requestAnimationFrame(() => {
      const chatBody = this.chatRef.nativeElement as HTMLElement;
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    });
  }

  private createForm(): void {
    this.customerSupportForm = this.formBuilder.group({
      promptText: [''],
    });
  }
}

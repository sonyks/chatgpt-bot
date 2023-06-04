import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  // Define a method to send a message and receive a response from ChatGPT
  chat(message: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.openAIKey}`,
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      temperature: 0.95,
      max_tokens: 250,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    return this.http
      .post<unknown>('https://api.openai.com/v1/chat/completions', body, {
        headers,
      })
      .pipe(
        switchMap((apiResponse: any) => {
          return of(apiResponse.choices[0].message.content as string);
        })
      );
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParseService } from '../services/parse.service';
import { Message } from '../chat-page/message.model';


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent {
  messages: Message[] = [];
  messageText: string = '';
  recieverid_studentId: string = '';
  studentName: string = '';
  senderId_teacher:  string = '';
  conversationId:string = '';
  
  
  constructor(private route: ActivatedRoute, private parseService: ParseService) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       this.recieverid_studentId = params.get('id') as string;
      //  console.log(this.conversationId);
   
       this.getStudentDetails();
      // this.conversationId = this.route.snapshot.paramMap.get('conversationId') as string;
     
      // Fetch chat partner's name using cardId
      // Fetch messages for this chat
    });
  }

  async loadMessages() {
    if (!this.conversationId) return;
    this.messages = await this.parseService.getMessages(this.conversationId);
    console.log('messages load', this.messages , this.conversationId);
    console.log(this.messages);
  }



  isMessageSentByCurrentUser(message: Message): boolean {
    
    return message.senderId === this.senderId_teacher; 
    
   
  }

  async getStudentDetails() {
    try {
      console.log(this.recieverid_studentId);
      const StudentDetails = await this.parseService.getStudentById(this.recieverid_studentId);
       
        this.studentName = StudentDetails.data.get("name");
        this.senderId_teacher = await this.parseService.user.objectId;
        const conversationResult = await this.getConversationID(this.senderId_teacher, this.recieverid_studentId);
      if(conversationResult){
        this.conversationId = conversationResult;
        console.log(this.conversationId,'123','successs');
        await this.loadMessages();

      }
      else {
        console.log('No conversation found');
      }

    } catch (error) {
      console.error('Error loading student details', error);
      // Handle the error
    }
  }


  async onSendMessage(text: string ) {
    const senderId_teacher =  await this.parseService.user.objectId/* ID of the sender (teacher) */;
    const receiverId_student = this.recieverid_studentId/* ID of the receiver (student) */;
    
    try {
      const message = await this.parseService.sendMessage(senderId_teacher, receiverId_student, text);
      
      console.log(message.conversationId);
      this.conversationId = message.conversationId;
   
    } catch (error) {
      // Handle the error here
    }
  }


  
  async getConversationID(TeacherID : string ,  StudentID :  string ){
    const id_get = await this.parseService.getConversationID(TeacherID, StudentID);
    console.log(id_get);
      return id_get;
  }
  

}

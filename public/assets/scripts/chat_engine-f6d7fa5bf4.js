class ChatEngine{constructor(e,s){this.chatBox=$("#"+e),this.userEmail=s,this.socket=io.connect("http://localhost:5000",{transports:["websocket"]}),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"codeial"}),e.socket.on("User_Joined",(function(s){e.userJoin(s)}))})),$("#send-message-form").submit((function(s){s.preventDefault();let t=$("#chat-message-input").val();""!=t&&e.socket.emit("send_message",{message:t,user_email:e.userEmail,chatroom:"codeial "})})),e.socket.on("receive_message",(function(s){let t=$("<li>"),o="recieved";s.user_email==e.userEmail&&(o="sent"),t.append($("<span>",{html:s.message}));let a=$("<div>");a.append($("<sub>",{html:s.user_email})),t.append(a),t.addClass(o),$("#message-list").append(t),$("#chat-box").scrollTop($("#chat-box")[0].scrollHeight),$("#chat-message-input").val("")}))}userJoin(e){let s=$("<li>");s.append($("<sub>",{html:e.user_email+" Joined The Chat"})),s.addClass("user-joined"),$("#message-list").append(s),$("#chat-box").scrollTop($("#chat-box")[0].scrollHeight)}}
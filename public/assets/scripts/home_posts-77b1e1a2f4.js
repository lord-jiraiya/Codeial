{let e=function(e,t){new Noty({theme:"relax",text:t,type:e,layout:"topRight",timeout:1500}).show()},t=function(){let t=$("#new-post-form");t.submit((function(n){n.preventDefault(),$.ajax({method:"POST",url:"/post/create",data:t.serialize(),success:function(t){let n=newPostDOM(t.data.post);$("#posts-list-container").prepend(n),$("#post-textarea").val(""),e("success",t.message)},error:function(e){console.error(e.reponseText)}})}))};newPostDOM=function(e){return`\n        <div class="post-display-box" id="post-${e._id}">\n            <div class="post-header">\n                <h6 class="user-name">\n                    ${e.user.name}\n                </h6>\n                    <a class="delete-post-button" href="/post/delete/${e._id}">x</a>\n            </div>\n            <div class="post-content">\n                <h3>\n                    ${e.content}\n                </h3>\n            </div>\n            <div>\n                <form  class="comment-form" action="/comment/create" method="post">\n                    <div class="comment-post-form">\n                        <input type="hidden" name="post" value="${e._id}">\n                        <input class="comment-box" type="text" name="comment" placeholder="Comment Here" required>\n                        <input class="comment-box-submit" type="submit" value="Comment">\n                    </div>\n                </form>\n            </div>\n            <div class="post-comment-container">\n            </div>\n        </div>\n    `},t()}
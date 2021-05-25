const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.createComment = async function(req, res){
    try{
        
        let post = await Post.findById(req.body.post);
        if(post){

            let newComment = await Comment.create({
                    comment: req.body.comment,
                    post: req.body.post,
                    user: req.user._id
            });

            post.comments.push(newComment);
            post.save();
            return res.redirect('back');
        }else{
            console.error('Invalid Request');
            return res.redirect('back');
        }

    }catch(error){
        return console.error("Error",error);

    }



}

module.exports.deleteComment = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);
        if(comment && comment.user == req.user.id ){

            await Post.findByIdAndUpdate(comment.id,{$pull: {comments: req.params.id}});
            console.log("Comment Deleted");
            comment.remove();
            return res.redirect('back');
        }else{
            console.log("Unauthoried Request");
            return res.redirect('back');
        }

    }catch(error){
        return console.error("Error",error);

    }


}
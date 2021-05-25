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
            let new_comment = await Comment.findById(newComment.id).populate('user');
            if(req.xhr){
                return res.status(200).json({
                    comment: new_comment,
                    message: "Comment Added",
                });
            }
            req.flash('success','Comment Added!');
            return res.redirect('back');
        }else{
            req.flash('error','Something went wrong');
            return res.redirect('back');
        }

    }catch(error){
        req.flash('error','Something went wrong');
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
            req.flash('success','Comment Deleted.');
            return res.redirect('back');
        }else{
            creq.flash('error','Aunthorised Request.');
            return res.redirect('back');
        }

    }catch(error){
        req.flash('error','Something went wrong');
        return console.error("Error",error);

    }


}
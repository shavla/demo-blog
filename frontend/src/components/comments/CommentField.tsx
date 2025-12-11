import { useEffect, useState, type ChangeEvent } from "react";

const CommentField = ({ callback, resetSignal }: { callback: (comment: string) => void, resetSignal: any }) => {
    const [comment, setComment] = useState<string>("");

    useEffect(() => {
        setComment("");
    }, [resetSignal]);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    return (<>
        <div className="flex flex-col items-start">
            <textarea
                className="textarea w-full max-w-xl resize-none"
                value={comment}
                onChange={handleInputChange}
                rows={5}
                placeholder="What are your thoughts?"
            ></textarea>
            <button className="btn btn-neutral mt-4" disabled={comment.length <= 0} onClick={() => callback(comment)}>Respond</button>
        </div>
    </>);
}

export default CommentField;
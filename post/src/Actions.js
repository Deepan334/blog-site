import Button from "./components/Button";
function Actions(data) {
  const { onLike, onDislike, onEdit, onDelete, isLike, isDislike } = data;
  return (
    <div>
      <Button action={onLike} name="Like" likeDislike={isLike} />
      <Button action={onDislike} name="Dislike" likeDislike={isDislike} />
      <Button action={onEdit} name="Edit" likeDislike={false} />
      <Button action={onDelete} name="Delete" likeDislike={false} />
    </div>
  );
}

export default Actions;

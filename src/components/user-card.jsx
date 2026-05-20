function UserCard({ userData }) {
  const { firstName, lastName, photoUrl } = userData;
  return (
    <div className="card bg-base-300 w-80 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{`${firstName} ${lastName}`}</h2>

        <div className="card-actions justify-between flex-1 items-end">
          <button className="btn btn-error">Ignore</button>
          <button className="btn btn-primary">Interest</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;

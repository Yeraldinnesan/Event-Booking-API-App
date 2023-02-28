import { gql, useQuery } from "@apollo/client";
import Events from "./Events";

const GET_EVENT = gql`
  query {
    events {
      title
      description
      image
      date
      price
      location
    }
  }
`;

const EventList = () => {
  const { loading, error, data } = useQuery(GET_EVENT);
  console.log("data", data);

  if (loading) <p>Loading....</p>;
  if (error) <p> Something went wrong!</p>;
  return (
    <div>
      {!loading && !error && (
        <div>
          {data.events?.map((el) => {
            return <Events key={el.id} event={el} />;
          })}
        </div>
      )}
    </div>
  );
};

export default EventList;

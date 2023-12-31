import { useParams } from "react-router-dom";
import Header from "./components/Header";
import voting from "../../protocols/voting";
import useModal from "../../hooks/useModal";
import EventDetails from "../../common/EventDetails";
import Icon from "../../common/Icon";

export default function CompletedPage() {
  const params = useParams();
  const did = params.did;
  const events = voting.getEventsPublishedByDid(did || "none");

  const { show } = useModal();

  return (
    <>
      <Header />
      {events.isLoading && (
        <p className="h-20 flex justify-center items-center text-2xl italic font-extralight">
          Loading...
        </p>
      )}
      {!events.isLoading && events.data && (
        <section className="p-page">
          <div className="flex flex-col">
            <h1 className="text-xl font-light font-raleway">
              Showing Past Events & Results for
            </h1>
            <p className="whitespace-nowrap truncate mt-2 border-2 p-4 rounded-xl w-[70vw] bg-white text-lg font-light">
              {did}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {events.data.filter((f) => f.expires < Date.now()).length == 0 ? (
              <div className="mt-12">
                <img
                  src="https://st.depositphotos.com/16203680/53343/v/450/depositphotos_533430192-stock-illustration-sad-cartoon-caricature-exclamation-mark.jpg"
                  className="h-[30vh]"
                />
                <p>No events found</p>
              </div>
            ) : (
              <>
                {events.data
                  .filter((f) => f.expires < Date.now())
                  .map((event, key) => (
                    // <div key={key}>
                    <button
                      className="w-[calc(20%_-_13px)] relative rounded border border-front border-opacity-30 duration-300 shadow p-4 flex text-left group hover:border-opacity-100"
                      key={key}
                      onClick={() =>
                        show(<EventDetails event={event} author={did || ""} />)
                      }
                    >
                      <Icon
                        icon="open_in_new"
                        className="duration-300 absolute top-0 right-0 translate-x-1/2 group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100 translate-y-1/4 p-1 text-3xl
                    rounded-full bg-background text-front border border-front"
                      />
                      <div className="flex flex-col justify-center gap-y-3 w-[6em]">
                        <h2 className="text-3xl uppercase font-light">
                          {event.metadata.uid}
                        </h2>

                        <p className="text-sm text-front text-opacity-70">
                          {event.metadata.name}
                        </p>
                      </div>
                    </button>
                    // </div>
                  ))}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}

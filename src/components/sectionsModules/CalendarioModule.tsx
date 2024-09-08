import React from "react";

const CalendarioModule = () => {
  return (
    <div>
      <h3 className="text-xl text-detail">Calendario</h3>

      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FArgentina%2FCordoba&bgcolor=%23ffffff&mode=WEEK&hl=es_419&src=dGVhbWh2ZXRAZ21haWwuY29t&src=ZW4uYXIjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%230B8043"
        className="border-none w-[90vw] md:w-[60vw] m-auto h-[80vh]"
      ></iframe>
    </div>
  );
};

export default CalendarioModule;

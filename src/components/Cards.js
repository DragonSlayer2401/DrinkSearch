const Cards = (props) => {
  //Creates the list of benefits on the Welcome page
  const createList = (list) => {
    return list.map((element, index) => {
      //Puts margin on the bottom of the final list item
      if (index !== list.length - 1) {
        return<li className="text-white w-full" key={index} tabIndex={1}>{element}</li>
      }
      else {
        return<li className="text-white mb-3" key={index} tabIndex={1}>{element}</li>
      }
    });
  };


  return (
    <article style={{ background: "#5C415D" }} className="p-10 text-lg rounded-md">
      <p className="text-white mb-3 max-w-6xl" tabIndex={1}>{props.text}</p>
      <ul>{createList(props.list)}</ul>
    </article>
  );
};

export default Cards;

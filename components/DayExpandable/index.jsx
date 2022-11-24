import { Root } from "./style";

const DayExpandable = ({ date }) => {
  return (
    <Root title={date.toDateString()}>
      <p>This is internal to this day</p>
    </Root>
  );
};

export default DayExpandable;

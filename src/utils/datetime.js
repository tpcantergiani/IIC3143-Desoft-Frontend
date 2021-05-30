import moment from 'moment';

const dateToStr = (file) => {
  const fileName = file.split('.').pop();
  console.log(fileName);
  const dateTime = moment().format('YMDHHmmssx');

  const output = `${dateTime}.${fileName}`;
  return output;
};

export default dateToStr;

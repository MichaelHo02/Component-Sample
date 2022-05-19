// sum of array of intergers
const sumArrOfNum = (arr) =>
  arr.length !== 0 ? arr.reduce((d, b) => d + b) : 0;

// fetch url and access result array by key
const fetchTarget = async (url, rsKey) => {
  const rp = await fetch(url);
  const rpjson = await rp.json();
  return await rpjson[rsKey];
};

// dig in target object and find ALL INSTANCES of a given key
const findAllByKey = (obj, keyToFind) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      key === keyToFind
        ? acc.concat([value])
        : typeof value === 'object'
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc,
    []
  );
};

// fetch api -> get results array -> get needed info based on keys array + limit array
const accessDataByKeys = async (url, rsKey, keysArr, limArr) => {
  // result container
  let finalResult = [];

  // fetch apu
  const data = await fetchTarget(url, rsKey);

  // slice data results array based on limits
  const slicedData =
    limArr.length > 0 ? data.slice(limArr[0], limArr[1]) : data;

  // loop through data items
  slicedData.map((item) => {
    let viewerObj = {};

    keysArr.forEach((key) => {
      const temp = findAllByKey(item, key);
      if (temp.length !== 0) viewerObj[key] = temp;
      else viewerObj[key] = 'empty';
    });

    // push to final result array
    finalResult.push(viewerObj);
  });

  return finalResult;
};

// ! SAMPLE USAGE
// ! REMEBER TO CHECK OVERVIEW API FOR INPUTTING THE KEYS ARRAY
accessDataByKeys(
  'https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy',
  'results',
  [
    'park_Id',
    'name',
    'displayAddress',
    'space',
    'contactNo',
    'website',
    'weekdays',
    'price',
    'nature',
    'vacancy',
  ],
  []
).then((food) => console.log(food));

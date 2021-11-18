// all categories in lower case, you have to convert toLowerCase() 
// for comparison when fetching from api
const CATEGORY_VAL_CURRENTLY_READING = 'currentlyreading';
const CATEGORY_VAL_WANT_TO_READ = 'wanttoread';
const CATEGORY_VAL_READ = 'read';


// 2 arrays for values & labels but every value index
// corresponding to a label for the same index in labels array

export const values = [
    CATEGORY_VAL_CURRENTLY_READING,
    CATEGORY_VAL_WANT_TO_READ,
    CATEGORY_VAL_READ
];

export const labels = [
    'Currently Reading',
    'Want to Read',
    'Read'
];

export const NO_CATEGORY_VAL = 'none';
export const NO_CATEGORY_LABEL = 'None';


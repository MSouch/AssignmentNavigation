import uuid from 'react-native-uuid';



/**
 * According the transaction type, background color can be used.
 * 0 : Green : Essential Transaction
 * 1 : Red : Leisure Transaction
 * 2 : Blue : Other Transaction
 */
export const TransactionType_bgColor = ['#C9E9D2','#FFCFB3','#CAF4FF'];


/**
 * Types of Transaction that are supported in this application.
 */
export enum TransactionType {
    Essential = 0,
    Leisure,
    Others,
};

/**
 * Interface defining the structure of a Transaction Entry.
 */
export interface TransactionEntry {
    id : string,
    title : string,
    amount : number,
    desc : string,
    type : TransactionType,
}


/**
 * A default TransactionEntry object with default values for each field.
 */
export const defaultTransactionEntry : TransactionEntry = {
    id : "",
    title : "",
    amount : 0,
    desc : "",
    type : TransactionType.Essential,
}

// Test Data that can be used to test the application while development phase.
const TEST_DATA : Array<TransactionEntry> = [
    {
        id: 'asid1',
        title: "Coffee with friends and family",
        desc: "Went to Tim Hortons for a coffee with James and Clair. Some random text to check for long description and see of elipsize property is working or not",
        amount: 7.33,
        type: TransactionType.Leisure,
    },
    {
        id: 'lasjd1',
        title: "Walmart grocery",
        desc: "Weekly grocery at Walmart",
        amount: 79.23,
        type: TransactionType.Essential,
    },
    {
        id: 'laks21',
        title: "Gap Shopping",
        desc: "Christmas shopping",
        amount: 32.13,
        type: TransactionType.Others,
    },
    {
        id: 'lkjsks21',
        title: "Harry Potter Book",
        desc: "Harry Potter and Chamber of Secrets",
        amount: 9.10,
        type: TransactionType.Leisure,
    },
    {
        id: 'lkjas22',
        title: "Costco",
        desc: "Monthly Shopping at Costco",
        amount: 91.10,
        type: TransactionType.Essential,
    },
];

// Uncomment line 91 and comment line 93 while developing the application to test the UI.
// const TRANSACTION_DATA : Array<TransactionEntry> = TEST_DATA;

const TRANSACTION_DATA : Array<TransactionEntry> = [];

/**
 * 
 * @returns Initial data set while app launches for the first time.
 */
export function getInitialData() : Array<TransactionEntry> {
    return TRANSACTION_DATA;
}


/**
 * Add a new entry in TRANSACTION_DATA array if it is not present. Update the entry if it is already present.
 * @param entry TransactionEntry object. 
 */
export function addEditTransaction(entry : TransactionEntry) {
    const currIdx = getIndex(entry);
    if(currIdx != -1) {
        TRANSACTION_DATA.splice(currIdx,1);
    }
    TRANSACTION_DATA.push(entry);
}

/**
 * Returns the index of TransactionEntry in TRANSACTION_DATA or -1 if entry is not present.
 * @param entry TransactionEntry object to search in the dataset. To find the entry in dataset, id is used.
 * @returns index of the entry in the dataset, -1 if the entry is not present.
 */
function getIndex(entry : TransactionEntry) : number{
    for(let i = 0; i<TRANSACTION_DATA.length; i++) {
        if(TRANSACTION_DATA[i].id === entry.id)
            return i;
    }
    return -1;
}


/**
 * Returns a single transaction entry based on the provided id.
 * Can return null or undefined.
 * @param id Transaction ID.
 * @returns Single Transaction entry that matches the ID.
 */
export function getTransactionByID(id : string) : TransactionEntry {
    const filterData = TRANSACTION_DATA.filter((item) => item.id == id);
    return filterData[0];
}

/**
 * Returns an Array of transactions containing transaction entry of given type.
 * @param type : TransactionType value to filter transactions
 * @returns : Array of TransactionEntry of given type
 */
export function getTransactionByType( type : TransactionType ) : Array<TransactionEntry> {
    const filterData = TRANSACTION_DATA.filter((item) => {
        console.log(type);
        item.type===type;
    })
    return filterData;
} 

/**
 * 
 * @returns Unique id string that can be used while creating new TransactionEntry object.
 */
export function getNewID() : string {
    const id = String(uuid.v4());
    console.log(`ID is : ${id}`);
    return id;
}
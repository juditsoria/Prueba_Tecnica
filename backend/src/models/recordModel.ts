type Record = {
    id: number;
    name: string;
    description: string;
  };
  
  const records: Record[] = [];
  
  export const getRecords = (): Record[] => records;
  
  export const getRecordById = (id: number): Record | undefined => {
    return records.find(record => record.id === id);
  };
  
  export const createRecord = (name: string, description: string): Record => {
    const newRecord = { id: Date.now(), name, description };
    records.push(newRecord);
    return newRecord;
  };
  
  export const deleteRecord = (id: number): boolean => {
    const index = records.findIndex(record => record.id === id);
    if (index === -1) return false;
    records.splice(index, 1);
    return true;
  };
  
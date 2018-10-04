export const getData = key => {
    let data = localStorage.getItem(key);
    
    return data ? JSON.parse(data) : null;
}

export const saveData = (key, value) => localStorage.setItem(key, JSON.stringify(value));
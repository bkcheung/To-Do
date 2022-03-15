// import './style.css';

const projectFactory = (name) => {
    return {name}
};

const listItemFactory = (description) => {
    let complete = false;
    let priority = "none";
    let dueDate = "none";
    return {description, complete, priority, dueDate}
};
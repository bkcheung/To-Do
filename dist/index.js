// import './style.css';

const projectFactory = (name) => {
    let list = [];
    return {name, list}
};

const listItemFactory = (description) => {
    let complete = false;
    let priority = "none";
    let dueDate = "none";
    return {description, complete, priority, dueDate}
};

const toDoList = (() => {
    this.list = [];

    const _makeProjectDiv = (project) => {
        const container = document.getElementById('container');

        const newDiv = document.createElement('div');
        newDiv.classList.add("project");
        newDiv.setAttribute('pName', project.name);

        const newDivHeader = document.createElement('div');
        newDivHeader.classList.add("projectHeader");
        newDivHeader.setAttribute('pName', project.name);
        newDivHeader.innerHTML = project.name;

        const newDivContent = document.createElement('div');
        newDivContent.classList.add("projectContent");
        newDivContent.setAttribute('pName', project.name);

        newDiv.append(newDivHeader, newDivContent);
        container.appendChild(newDiv);
    }

    const addProject = (name) => {
        const newProj = projectFactory(name);
        list.push(newProj);
        _makeProjectDiv(newProj);
    }

    return {
        list, addProject
    }
})();
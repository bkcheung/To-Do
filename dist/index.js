// import './style.css';

const projectFactory = (name) => {
    let pList = [];
    let id;
    return {name, id, pList}
};

const listItemFactory = (description) => {
    let complete = false;
    let priority = "none";
    let dueDate = "none";
    return {description, complete, priority, dueDate}
};

const toDoList = (() => {
    this.masterList = [];

    const _makeProjectDiv = (project) => {
        const container = document.getElementById('container');

        const newDiv = document.createElement('div');
        newDiv.classList.add("project");
        newDiv.setAttribute('pName', project.name);

        const newDivHeader = document.createElement('div');
        newDivHeader.classList.add("projectHeader");
        // newDivHeader.setAttribute('pName', project.name);
        newDivHeader.innerHTML = project.name;

        const newDivContent = document.createElement('div');
        newDivContent.classList.add("projectContent");
        newDivContent.setAttribute('id', project.id); //unique ID for content area

        // newDivContent.appendChild(newItemButton);
        newDiv.append(newDivHeader, newDivContent);
        container.appendChild(newDiv);

        _genPContent(project);

    }

    const _genPContent = (project) => {
        const projectList = project.pList;
        const projectCont = document.getElementById(`${project.id}`);
        projectCont.innerHTML = '';

        projectList.forEach(element => {
            const listItem = document.createElement('li');
            listItem.classList.add('listItem');
            listItem.innerHTML = element.description;
            projectCont.appendChild(listItem);
        });

        const newItemButton = document.createElement('button');
        newItemButton.classList.add("newItem");
        newItemButton.setAttribute('pName', project.name);
        newItemButton.innerText = "Add Item";
        newItemButton.setAttribute('onclick', `toDoList.addItem('New item',${project.id})`);
        projectCont.appendChild(newItemButton);
        
    }

    const addProject = (name) => {
        const newProj = projectFactory(name);
        newProj.id = masterList.length;
        masterList.push(newProj);
        _makeProjectDiv(newProj);
    }

    const addItem = (description, listId) => {
        const newItem = listItemFactory(description);
        const project = masterList[listId];
        project.pList.push(newItem);
        _genPContent(project);
    }

    return {
        masterList, addProject, addItem
    }
})();
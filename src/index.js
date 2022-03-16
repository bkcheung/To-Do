import './style.css';

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
    let masterList = [];

    const addProject = (name) => {
        const newProj = projectFactory(name);
        newProj.id = masterList.length;
        masterList.push(newProj);
        genList.makeProjectDiv(newProj);
        return newProj;
    }

    const removeProject = (id) => {
        console.log(masterList);
        if(id == 0){
            masterList.splice(1);
        }
        else {
            const removed = masterList.splice(id);
            console.table(removed);
            masterList.concat(removed.splice(1));
        }
        console.table(masterList);
    }

    const addItem = (description, listId) => {
        const newItem = listItemFactory(description);
        const project = masterList[listId];
        project.pList.push(newItem);
        genList.genPContent(project);
    }
    
    return {
        masterList, addProject, addItem, removeProject
    }
})();

const genList = (() => {
    const _newItemButton = (project) => {
        const newItemButton = document.createElement('button');
        newItemButton.classList.add("newItem");
        newItemButton.setAttribute('pName', project.name);
        newItemButton.innerText = "Add Item";
        newItemButton.setAttribute('onclick', `addItem('New item',${project.id})`);

        return newItemButton;
    }

    const pageInit = () => {
        const header = document.createElement('header');
        header.innerHTML = "🌱 To Do";
    
        const content = document.createElement('div');
        content.setAttribute('id', 'container');
    
        const footer = document.createElement('footer');
        footer.innerHTML = "Copyright bkcheung 2022";

        const newProjButton = document.createElement('button');
        newProjButton.setAttribute('id', 'newProject');
        newProjButton.setAttribute('onclick', `toDoList.addProject('New List')`);
        newProjButton.innerText = 'New Project List';

        document.body.append(header, content, newProjButton, footer);

        const defaultProj = toDoList.addProject('Today');
        toDoList.addItem('Clean room!', defaultProj.id);

        console.log(toDoList.masterList);
    }

    const genPContent = (project) => {
        const projectList = project.pList;
        const projectCont = document.getElementById(`${project.id}`);
        projectCont.innerHTML = ''; 

        projectList.forEach(element => {
            const listItem = document.createElement('li');
            listItem.classList.add('listItem');
            listItem.innerHTML = element.description;
            projectCont.appendChild(listItem);
        });

        const itemButton = _newItemButton(project);
        projectCont.appendChild(itemButton);
    }

    const makeProjectDiv = (project) => {
        const container = document.getElementById('container');

        const newDiv = document.createElement('div');
        newDiv.classList.add("project");

        const newDivHeader = document.createElement('div');
        newDivHeader.classList.add("projectHeader");
        newDivHeader.innerHTML = project.name;

        const newDivContent = document.createElement('div');
        newDivContent.classList.add("projectContent");
        newDivContent.setAttribute('id', project.id); //set ID for content area

        newDiv.append(newDivHeader, newDivContent);
        container.appendChild(newDiv);

        genPContent(project);

    }

    return {
        makeProjectDiv, genPContent, pageInit
    }
})();

genList.pageInit();
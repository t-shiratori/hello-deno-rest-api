const fetchMembers = async () => {
  try {
    const jsonResponse = await fetch('/api/v1/members');
    return await jsonResponse.json();
  } catch (error) {
    console.log('error', error);
  }
};

const postMember = async (name) => {
  if (!name) return;
  try {
    const jsonResponse = await fetch(`/api/v1/member/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    return await jsonResponse.json();
  } catch (error) {
    console.log('error', error);
  }
};

const updateMember = async (id, name) => {
  if (!id || !name) return;
  try {
    const jsonResponse = await fetch(`/api/v1/member/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    return await jsonResponse.json();
  } catch (error) {
    console.log('error', error);
  }
};

const deleteMember = async (id) => {
  console.log('deleteMember');
  if (!id) return;
  try {
    const jsonResponse = await fetch(`/api/v1/member/${id}`, {
      method: 'DELETE',
    });
    return await jsonResponse.json();
  } catch (error) {
    console.log('error', error);
  }
};

const renderOutputList = async () => {
  const response = await fetchMembers();
  outputList.innerHTML = response.reduce(
    (prev, current) =>
      `${prev}<li><span class="id">[ID]: ${current.id}</span> <span class="name">[Name]: ${current.name}</span> <button data-id="${current.id}" data-type="delete" class="deleteButton" onclick="deleteMember()">Delete</button></li>`,
    ''
  );
};

const addButton = document.getElementById('addButton');
const addNameInput = document.getElementById('addNameInput');
const updateIdInput = document.getElementById('updateIdInput');
const updateNameInput = document.getElementById('updateNameInput');
const updateButton = document.getElementById('updateButton');
const outputList = document.getElementById('outputList');

// delete button
outputList.addEventListener('click', async (e) => {
  const { id, type } = e.target.dataset;
  if (!id) return;
  console.log({ id, type });
  await deleteMember(id);
  renderOutputList();
});

// add button
addButton.addEventListener('click', async () => {
  console.log(addNameInput.value);
  const { value } = addNameInput;
  if (!value) return;
  await postMember(value);
  addNameInput.value = '';
  renderOutputList();
});

// update button
updateButton.addEventListener('click', async () => {
  console.log(updateNameInput.value);
  const { value: id } = updateIdInput;
  const { value: name } = updateNameInput;
  if (!id || !name) return;
  await updateMember(id, name);
  updateIdInput.value = '';
  updateNameInput.value = '';
  renderOutputList();
});

document.addEventListener('DOMContentLoaded', () => {
  renderOutputList();
});

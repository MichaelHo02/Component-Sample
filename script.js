const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var currentPage = 0;

const renderPagination = (arr, size) => {
	const lastPage = Math.ceil(arr.length / size);

	$('#prev').onclick = (e) => {
		if (currentPage - 1 >= 0) currentPage--;
		renderPagination(arr, size);
	};

	$('#next').onclick = (e) => {
		if (currentPage + 1 < lastPage) currentPage++;
		renderPagination(arr, size);
	};

	$('#page').innerText = `${currentPage + 1}/${lastPage}`;

	renderPage(arr, currentPage * size, size);
};

const callBackModal = (obj) => {
	// header logic
	$('.modal-title').innerText = 'hello';
	// body logic
	const body = $('.modal-body');
	body.innerText = 'hello';
	// try to display all the info

	// fotter logic
};

const renderCard = (obj) => {
	console.log(obj.id);
	const frag = document.createRange().createContextualFragment(`
        <div class="card text-center my-3">
            <div class="card-header">
                ID And Title
            </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <!-- Button trigger modal -->
                <button id=id${obj.id} type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#readmore">
                    Read More
                </button>
            </div>
            <div class="card-footer text-muted">
                Some footer
            </div>
        </div>
    `);
	frag.querySelector(`#id${obj.id}`).onclick = (e) => callBackModal(obj);
	return frag;
};

const renderPage = (arr, start, limit) => {
	console.log(start, limit);
	const area = $('#area');
	area.innerHTML = '';
	for (let i = start; i < start + limit; i++) {
		if (!arr[i]) break;
		area.appendChild(renderCard(arr[i]));
	}
};

renderPagination(
	[
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 },
		{ id: 6 },
		{ id: 7 },
	],
	5
);

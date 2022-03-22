let targetId;
// 미리 작성된 영역 - 수정하지 않으셔도 됩니다.
// 사용자가 내용을 올바르게 입력하였는지 확인합니다.
function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 500) {
        alert('공백 포함 140자 이하로 입력해주세요');
        return false;
    }
    return true;
}
// 수정 버튼을 눌렀을 때, 기존 작성 내용을 textarea 에 전달합니다.
// 숨길 버튼을 숨기고, 나타낼 버튼을 나타냅니다.
function editPost(id) {
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 여기서부터 코드를 작성해주시면 됩니다.

$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    getMessages();
    $('#write').on('click', function(){
        $('#write-container').removeClass('dn');
    });

    $('.close').on('click', function () {
        $('.popup-container').removeClass('dn').addClass('dn');
    })
    $('.task[]').on('click',function(){

    })
})

// 메모를 불러와서 보여줍니다.
function getMessages() {
    // 1. 기존 메모 내용을 지웁니다.
    $('.list-group').empty();
    // 2. 메모 목록을 불러와서 HTML로 붙입니다.

    $.ajax({
        url : "/api/tasks",
        type : "get",
        data : '',
        success : function(response){
            console.log(response);
            for(let i = 0 ; i < response.length; i++){
                let task =response[i];
                let id = task.id;
                let title = task.title;
                let author = task.author;
                let content = task.content;
                let modifiedAt = task.modifiedAt;
                addHTML(id, title, author, content, modifiedAt);
            }
        }
    });

}

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addHTML(id, title, author, content, modifiedAt) {
    // 1. HTML 태그를 만듭니다.
    let tempHtml = `
        <a href="#" onclick="showTask(${id})" class="list-group-item list-group-item-action task">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${title}</h5>
                <small>${modifiedAt}</small>
            </div>
            <div class="d-flex w-100 justify-content-between">
                <div></div>
                <small>${author}</small>
            </div>
        </a>
    `;
    // 2. #cards-box 에 HTML을 붙인다.
    $('.list-group').append(tempHtml);
}

// 메모를 생성합니다.
function writePost() {
    // 1. 작성한 메모를 불러옵니다.
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    // 3. genRandomName 함수를 통해 익명의 username을 만듭니다.
    // 4. 전달할 data JSON으로 만듭니다.
    // 5. POST /api/memos 에 data를 전달합니다.


    let author = $("#write-popup-author").val();
    let content = $("#write-popup-content").val();
    let title = $("#write-popup-title").val();
    console.log(content.length);
    if( content == '') return;
    if( !isValidContents(author) ) return;
    if( !isValidContents(title) ) return;
    let data = {'author' : author, 'content' : content, 'title' : title};

    $.ajax({
        url : "/api/tasks",
        type : "POST",
        contentType: 'application/json',
        data : JSON.stringify(data),
        success : function(response){
            alert("글이 등록되었습니다.");
            window.location.reload();
        },
        error : function(err){
            console.log(err);
        }
    })

}
function showTask(id){
    targetId=id;
    $.ajax({
        type:"GET",
        url: `/api/tasks/${id}`,
        success: function(response){
            let task = response[0];
            $("#update-container").removeClass("dn");
            $("#update-container #update-popup-title").val(task.title);
            $("#update-container #update-popup-content").text(task.content);
            $("#update-container #update-popup-author").val(task.author);
        }

    })
}
// 메모를 수정합니다.
function updatePost() {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    // 3. 전달할 data JSON으로 만듭니다.
    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    let author = $("#update-popup-author").val();
    let content = $("#update-popup-content").val();
    let title = $("#update-popup-title").val();
    if( !isValidContents(content) ) return;
    if( !isValidContents(author) ) return;
    if( !isValidContents(title) ) return;
    let data ={
        'id' : targetId,
        'title' : title,
        'content' : content,
        'author' : author
    }
    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/tasks/${targetId}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 변경에 성공하였습니다.');
            window.location.reload();
        }
    });

}
// 메모를 삭제합니다.
function deleteOne(id) {
    // 1. DELETE /api/memos/{id} 에 요청해서 메모를 삭제합니다.
    let data = {'id' : id};
    $.ajax({
        type: "DELETE",
        url: `/api/memos/${id}`,
        contentType: "application/json",
        success: function (response) {
            alert('메시지 고로시 완료.');
            window.location.reload();
        }
    });
}
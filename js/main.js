$(document).ready(function() {
    var timeout;
    $('#searchUser').on('keyup', function(e) {
        var username = e.target.value;

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            getData(username)
        }, 500);

    });


    function getData(username) {
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: 'c947c3ee4a124d1a69c1',
                client_secret: 'dc5cc19ce757ee522d4e9fba75ffe2a7826ecd35'
            }
        }).done(function(user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: 'c947c3ee4a124d1a69c1',
                    client_secret: 'dc5cc19ce757ee522d4e9fba75ffe2a7826ecd35',
                    sort: 'created: asc',
                    per_page: 50
                }
            }).done(function(repos) {
                $.each(repos, function(index, repo) {
                    $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-5">
                  <strong class="p-title">${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-2">
                    <p>语言：${repo.language}</p>
                </div>
                <div class="col-md-3">
                  <span class="margin label label-default">Forks: ${repo.forks_count}</span>
                  <span class="margin label label-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="margin label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn  btn-primary">查看项目</a>
                </div>
              </div>
            </div>
          `);
                });
            });


            if (user.company === null) {
                user.company = "暂未登记";
            }

            if (user.blog === null) {
                user.blog = "暂未登记";
            }

            if (user.location === null) {
                user.location = "暂未登记";
            }

            $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" width="100%" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">详细信息</a>
              </div>
              <div class="col-md-9">
              <span class="margin label label-default">Public Repos: ${user.public_repos}</span>
              <span class="margin label label-primary">Public Gists: ${user.public_gists}</span>
              <span class="margin label label-success">Followers: ${user.followers}</span>
              <span class="margin label label-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">公司: ${user.company}</li>
                <li class="list-group-item">博客: ${user.blog}</li>
                <li class="list-group-item">地址: ${user.location}</li>
                <li class="list-group-item">创建日期: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">创建的项目</h3>
        <div id="repos"></div>
      `);
        });
    }


});

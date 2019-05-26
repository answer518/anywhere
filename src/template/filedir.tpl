
<!doctype html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>{{title}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <style>
        body, ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        body {
            margin: 30px;
        }

        a {
            font-size: 28px;
        }
    </style>
</head>
<body>
    <ul class="filelist">
    {{#each files}}
        <li><a href="{{../dir}}{{this}}">{{this}}</a><li>
    {{/each}}
    </ul>
</body>
</html>

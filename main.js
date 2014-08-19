require.config({
    baseUrl: '.',
    map: {
      '*': {
        'less': 'bower_components/require-less/less' // path to less
      }
    },
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        text: 'bower_components/requirejs-text/text',
    }
});

require(['jquery', 'spaces', 'text!data/spaces.json', 'less!style/main'], function($, spaces, data) {
    $('#space-demo').spaces(JSON.parse(data));
});
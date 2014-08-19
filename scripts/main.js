require.config({
    baseUrl: '.',
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery',
        text: 'bower_components/requirejs-text/text'
    },
    shim: {
    },
    map: {
      '*': {
        'less': 'bower_components/require-less/less' // path to less
      }
    }
});

require(['jquery', 'scripts/spaces', 'text!data/spaces.json'], function($, spaces, data) {
    $('#space-demo').spaces(JSON.parse(data));
});
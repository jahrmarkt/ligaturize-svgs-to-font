const svg2font = require('svgicons2svgfont');
const fs = require('fs');
const path = require('path');
var svg2ttf = require('svg2ttf');

const fontStream = new svg2font({
  fontName: 'streamline-icons',
  fontHeight: 1000,
  normalize: true,
  prependUnicode: true,
});
const basePath = "./svgs";

// Setting the font destination
fontStream.pipe(fs.createWriteStream('font/hello.svg'))
  .on('finish',function() {
    console.log('Font successfully created!');

    var ttf = svg2ttf(fs.readFileSync('./font/hello.svg', 'utf8'), {});
    fs.writeFileSync('myfont.ttf', new Buffer(ttf.buffer));
  })
  .on('error',function(err) {
    console.log(err);
  });

const items = fs.readdirSync(basePath);

for(var i=0; i<items.length; i++){
  const svgIcon = fs.createReadStream(basePath + "/" + items[i]);
  svgIcon.metadata = {
    name: path.basename(items[i], ".svg"),
    unicode:[path.basename(items[i], ".svg")]
  };
  fontStream.write(svgIcon);
}

fontStream.end();


const fse = require(`fs-extra`);

const dbPath = `routes/artworks_db.json`;

const db = {
  GetArtworks: async function () {
    const dbExists = await fse.pathExists(dbPath);
    if (!dbExists) {
      //On GAE we can't write to the file system
      if (process.env.NODE_ENV !== "production") {
        await fse.writeJSON(dbPath, { artworks: [] });
      } else {
        return { artworks: [] };
      }
    }

    const data = await fse.readJson(dbPath);
    return data;
  },

  AddArtwork: async function (artwork) {
    let data = await this.GetArtworks();

    //TODO: validate data before adding it.

    //On GAE we can't write to the file system
    if (process.env.NODE_ENV !== "production") {
      data.artworks.push(artwork);
      await fse.writeJSON(dbPath, data, { spaces: 4 });
    }

    return data;
  },

  ResetWithRandomArtworks: async function (amount) {
    let data = await this.GetArtworks();

    //On GAE we can't write to the file system
    if (process.env.NODE_ENV !== "production") {
      data.artworks = _generateRandomArtworks(amount);
      await fse.writeJSON(dbPath, data, { spaces: 4 });
    }

    return data;
  },
};

////// HELPERS

const basicColors = [
  [0, 0, 0], //black
  [255, 255, 255], //white
  [255, 0, 0], //red
  [0, 255, 0], //green
  [0, 0, 255], //blue
  [255, 255, 0], //yellow
  [255, 0, 255], //pink
  [0, 255, 255], //cyan
];

const _generateRandomColorInt = () => {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ];
};

const _getRandomLinearBitmap = (width, height) => {
  const randomColorRGBInt = _generateRandomColorInt();
  let bitmap = [];
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      bitmap.push(randomColorRGBInt[0]);
      bitmap.push(randomColorRGBInt[1]);
      bitmap.push(randomColorRGBInt[2]);
    }
  }

  return bitmap;
};

const _generateRandomArtworks = (amount) => {
  let artworkObjects = [];
  for (let i = 0; i < amount; i++) {
    let artworkObject = {};
    artworkObject.name = `artwork_name_${i}`;
    artworkObject.user = `user_name_${i}`;
    artworkObject.date = `01 ${i} 2020`;
    artworkObject.songId = `artist${i}/song${i}`;
    artworkObject.bitmap = _getRandomLinearBitmap(1, 1);

    artworkObjects.push(artworkObject);
  }

  return artworkObjects;
};

module.exports = db;

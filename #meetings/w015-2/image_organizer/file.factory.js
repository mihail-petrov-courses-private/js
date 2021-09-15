const file = (fileTitle) => {

    const fileSegmentCollection = fileTitle.split('.');
    const fileSegmentCount      = fileSegmentCollection.length;
    const name                  = fileSegmentCollection[0];
    const extention             = fileSegmentCollection[fileSegmentCount - 1];

    return { name, extention };
};


module.exports = file;
const getHome = (func) => {
  gapi.client.drive.files.list({
    q: `'${TOP_DIR_ID}' in parents and mimeType != 'application/vnd.google-apps.folder'`, 
    fields: "files(*)",
    orderBy: "createdTime desc"
  }).then((res)=>{
    func(res.result.files.map((f)=>{
      f.name = f.name.replace(/\.txt$/, '');
      return f
    }));
  });
}

const collections = (func)=>{
  gapi.client.drive.files.list({
    q: `'${TOP_DIR_ID}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
    orderBy: "modifiedTime desc"
  }).then((res)=>{
    func(res.result.files);
  });
}

const collection = (id, func) => {
  gapi.client.drive.files.get({fileId: id}).then((res)=>{
    search(res.result.name, func);
  });
}

const search = (keyword, func) => {
  gapi.client.drive.files.list({
    q: searchQuery(keyword),
    fields: "files(*)",
    orderBy: "modifiedTime desc"
  }).then((res)=>{
    func(res.result.files.map((e)=>{
      e.name = e.name.replace(/\.txt$/, '');
      return e
    }));
  });
}

const searchQuery = (keyword)=>{
  return `(fullText contains '${keyword}' or fullText contains '${keyword.replace(/\ /g, '_')}') and '${TOP_DIR_ID}' in parents and mimeType != 'application/vnd.google-apps.folder'`
}

const getCard = (card_id, func) => {
  gapi.client.drive.files.get({fileId: card_id, fields: "*"}).then((res)=>{
    let card = res.result;
    gapi.client.drive.files.get({fileId: card_id, alt: 'media'}).then((res)=>{
      card.body = res.body;
      card.name = card.name.replace(/\.txt$/, '');
      func(card);
    });
  });
}

const update = (id, title, body, func)=>{
  gapi.client.request({
    path: '/upload/drive/v3/files/' + id,
    method: 'PATCH',
    params: {
      uploadType: 'media'
    },
    body: body
  }).then((res)=>{
    proccessHashTag(res.result, body, func)
  });
}

const create = (title, body, func)=>{
  gapi.client.request({
    path: '/drive/v3/files',
    method: 'POST',
    body: JSON.stringify({
      mimeType: 'text/plain',
      name: `${title}.txt`,
      parents: [TOP_DIR_ID]
    })
  }).then((res)=>{
    update(res.result.id, title, body, func);
  })
}

const proccessHashTag = (res, body, func)=>{
  const match = body.match(/[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー_]+/g)
  if(!match){
    func(res);
    return true;
  }
  const tags = match.map((e)=> e.replace(/^#/, '').replace(/_/g, ' '));

  var promises = [];
  tags.forEach((tag)=>{
    const p = gapi.client.drive.files.list({
      q: `'${TOP_DIR_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${tag}'`
    });
    promises.push(p);
  });
  Promise.all(promises).then((results)=>{
    const files = results.map((r)=> r.result.files[0])
    const tagsToCreate = tags.filter((tag)=>{
      var flag = true;
      files.filter((f)=> f).forEach((file)=>{;
        if(file.name === tag){ flag = false; }
      })
      return flag
    });
    const tagsToUpdate = tags.filter((tag)=>{
      var flag = true;
      files.filter((f)=> f).forEach((file)=>{;
        if(file.name === tag){ flag = false; }
      })
      return !flag
    });
    tagsToUpdate.forEach((tag)=>{
      gapi.client.drive.files.list({
        q: `name = '${tag}' and '${TOP_DIR_ID}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
        orderBy: "modifiedTime desc"
      }).then((res)=>{
        const folder = res.result.files[0];
        gapi.client.drive.files.update({
          fileId: folder.id,
          modifiedTime: (new Date()).toISOString()
        }).then((res)=>{
        });
      });
      
    });
    promises = []
    tagsToCreate.forEach((tag)=>{
      promises.push(gapi.client.drive.files.create({
        resource: {
          name: tag, 
          mimeType: "application/vnd.google-apps.folder" ,
          parents: [TOP_DIR_ID]
        },
        fields: "id"
      }));
    });
    Promise.all(promises).then((results)=>{
      func(res);
    });
  });
}

const related = (card_id, func)=>{
  getCard(card_id, (card)=>{
    const match = card.body.match(/[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー_]+/g);
    if(!match){ return true }
    const tags = match.map((e)=> e.replace(/^#/, ''));

    var promises = [];

    tags.forEach((tag)=>{
      const keyword = tag.replace(/_/g, ' ');
      promises.push(gapi.client.drive.files.list({
        q: `name = '${keyword}' and '${TOP_DIR_ID}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
        orderBy: "modifiedTime desc"
      }));
    });

    Promise.all(promises).then((results)=>{
      const collections = results.map((r)=> r.result.files[0]);
      promises = [];
      tags.forEach((tag)=>{
        promises.push(  
          gapi.client.drive.files.list({
            q: searchQuery(tag),
            fields: "files(*)",
            orderBy: "modifiedTime desc"
          })
        )
      });
      Promise.all(promises).then((results)=>{
        let result = [];
        tags.forEach((tag,i)=>{
          const cards = results[i].result.files.slice(0,10).map((e)=>{ 
            e.name = e.name.replace(/\.txt$/, ''); 
            return e; 
          }).filter((e)=> e.id != card_id);
          if(collections[i]){
            result.push({
              collection: collections[i], 
              cards: cards
            });
          }
        });
        func(result);
      });
    });
  });
}

export { getHome, search, getCard, update, create, collection, collections, related }

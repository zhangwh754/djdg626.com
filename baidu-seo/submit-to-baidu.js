const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');
const config = require('./config');

// 网站的sitemap URL
const sitemapUrl = 'https://www.084612.xyz/sitemap.xml';
const outputFile = path.join(__dirname, 'urls.txt');

async function fetchSitemap() {
  try {
    console.log('正在获取网站地图...');
    const response = await axios.get(sitemapUrl);
    return response.data;
  } catch (error) {
    console.error('获取网站地图失败:', error.message);
    process.exit(1);
  }
}

async function parseSitemap(xmlData) {
  try {
    console.log('正在解析网站地图...');
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);

    if (!result.urlset || !result.urlset.url) {
      throw new Error('网站地图格式不正确');
    }

    // 提取所有URL
    const urls = result.urlset.url.map(urlObj => urlObj.loc[0]);
    console.log(`共找到 ${urls.length} 个URL`);
    return urls;
  } catch (error) {
    console.error('解析网站地图失败:', error.message);
    process.exit(1);
  }
}

function saveUrlsToFile(urls) {
  try {
    console.log('正在保存URL到文件...');
    fs.writeFileSync(outputFile, urls.join('\n'));
    console.log(`URL已保存到 ${outputFile}`);
  } catch (error) {
    console.error('保存URL失败:', error.message);
    process.exit(1);
  }
}

async function submitToBaidu() {
  try {
    console.log('正在提交URL到百度...');
    const token = config.baiduToken;
    const site = 'https://www.084612.xyz';
    const apiUrl = `http://data.zz.baidu.com/urls?site=${site}&token=${token}`;

    const urlsData = fs.readFileSync(outputFile, 'utf-8');

    const response = await axios.post(apiUrl, urlsData, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });

    console.log('提交结果:', response.data);
  } catch (error) {
    console.error('提交到百度失败:', error.message);
    if (error.response) {
      console.error('响应数据:', error.response.data);
    }
  }
}

async function main() {
  const xmlData = await fetchSitemap();
  const urls = await parseSitemap(xmlData);
  saveUrlsToFile(urls);

  await submitToBaidu();
}

main().catch(error => {
  console.error('程序执行失败:', error.message);
});
const Footer = function () {
  const footerNode = document.createElement("footer");
  const pNode = document.createElement("p");
  const content = document.createTextNode("FESP 1기 Javascript Project");
  pNode.appendChild(content);
  footerNode.appendChild(pNode);
  return;
  <>
    <Footer>
      <p>푸터</p>
    </Footer>
  </>;
};

export default Footer;

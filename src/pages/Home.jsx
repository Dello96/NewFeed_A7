import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { default as styled } from "styled-components";
import breadMain from "../assets/breadMain.jpg";
import HomePageCards from "../components/HomePageCards";
import { GlobalStyles } from "../components/NightMode";
import Sorting from "../components/Sorting";
import { auth } from "../firebase";

const HomeHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonImg = styled.img`
  display: flex;
  width: 200px;
  height: 80px;
  margin: 10px;
  cursor: pointer;
`;

const ImgButton = styled.button`
  display: flex;
  width: 200px;
  height: 80px;
  margin: 20px;
  background-color: transparent;
  border: 0px;
`;

const WrappingBtns = styled.div`
  display: flex;
`;

const Btns = styled.div`
  margin: 20px;
  flex: 0 0 90%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
  border: 0px;
`;

const PostBreadBtn = styled.button`
  background-color: #ffebc1;
  border: 0px;
  border-radius: 20px;
  width: 170px;
  height: 30px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
`;
const LoginBtn = styled.button`
  background-color: #ffebc1;
  border: 0px;
  border-radius: 20px;
  width: 100px;
  height: 30px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
`;

const LogOutBtn = styled.button`
  background-color: #ffebc1;
  border: 0px;
  border-radius: 20px;
  width: 100px;
  height: 30px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
`;

const ModeBtn = styled.button`
  background-color: transparent;
  border: 0px;
  width: 100px;
  height: 30px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
`;

const SearchBtn = styled.button`
  background-color: #ffebc1;
  border: 0px;
  border-radius: 20px;
  width: 80px;
  height: 30px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
`;
const TopButton = styled.button`
  cursor: pointer;
  position: fixed;
  width: 40px;
  height: 40px;
`;

function Home({ users, setUsers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
    alert("로그아웃되었습니다.");

    navigate("/");
    setEmail("");
    setPassword("");
    navigate("/");
    setUsers({ isdone: false });
  };
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const navigate = useNavigate();
  const navigateWriting = () => {
    if (users.isdone) {
      navigate("/write");
    } else {
      alert("로그인이 필요합니다!");
    }
  };
  const navigateLogin = () => {
    navigate("/login");
  };
  const navigateHome = () => {
    navigate("/");
  };
  const MovetoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <GlobalStyles theme={theme} />
      <div>
        <HomeHeader>
          <ImgButton onClick={navigateHome}>
            <ButtonImg src={breadMain} />
          </ImgButton>
          <WrappingBtns>
            <Btns>
              <SearchBtn>🔍</SearchBtn>
              <PostBreadBtn onClick={navigateWriting}>
                빵 소개하러 가기
              </PostBreadBtn>
              {users?.isdone === false ? (
                <LoginBtn onClick={navigateLogin}>로그인</LoginBtn>
              ) : (
                <>
                  <h1>{users?.nickname}님 환영합니다.</h1>
                  <LogOutBtn onClick={logOut}>로그아웃</LogOutBtn>
                </>
              )}
              <LoginBtn onClick={() => navigate("/register")}>
                회원가입
              </LoginBtn>
              <ModeBtn onClick={themeToggler}>
                {theme === "light" ? "🌚" : "🌞"}
              </ModeBtn>
            </Btns>
          </WrappingBtns>
        </HomeHeader>
        {/* //여기까지 헤더부분 */}
        <Sorting />
        <HomePageCards />
      </div>
      <TopButton onClick={MovetoTop} />
    </div>
  );
}

export default Home;

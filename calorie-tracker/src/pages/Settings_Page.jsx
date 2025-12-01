import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Icons:
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdLockPerson } from "react-icons/md";
import { MdLanguage } from "react-icons/md";

// Import Forms:
import P_Form from "../components/Settings_P_Form.jsx";
import A_Form from "../components/Settings_A_Form.jsx";
import Priv_Form from "../components/Settings_Priv_Form.jsx";
import Lang_Form from "../components/Settings_Lang_Form.jsx";

//import Toggle_Mode from '../components/Toggle_Mode.jsx';

function Settings_Page ( {user, setUser } ) { 

    const navigate = useNavigate();

    // Parse user data into states:
    const [appearance, setAppearance] = useState('');
    const [language, setLanguage] = useState('');
    const [first_name, setFName] = useState('');
    const [last_name, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [user_id, setUserId] = useState('');

    // Page states:
    const [is_profile_page, setProfilePage] = useState(false);
    const [is_appear_page, setAppearancePage] = useState(false);
    const [is_privacy_page, setPrivacyPage] = useState(false);
    const [is_lang_page, setLanguagePage] = useState(false);

    useEffect(() => {                                                           // load data
        setAppearance(user.appearance);
        setLanguage(user.language);
        setFName(user.first_name);
        setLName(user.last_name);
        setEmail(user.email);
        setPhone(user.phone);
        setImage(user.image);
        setPassword(user.password);
        setUserId(user._id);
    }, []);

    const toProfileSettings = async () => {                                         // navigate button Home
        setProfilePage(true);
        setAppearancePage(false);
        setPrivacyPage(false);
        setLanguagePage(false);
    }

    const toAppearanceSettings = async () => {                                         // navigate button Home
        setAppearancePage(true);
        setProfilePage(false);
        setPrivacyPage(false);
        setLanguagePage(false);
    }

    const toPrivacySecSettings = async () => {                                         // navigate button Home
        setPrivacyPage(true);
        setProfilePage(false);
        setAppearancePage(false);
        setLanguagePage(false);
    }

    const toLanguageSettings = async () => {                                         // navigate button Home
        setLanguagePage(true);
        setProfilePage(false);
        setAppearancePage(false);
        setPrivacyPage(false);
    }

    const reset = async () => {
        setProfilePage(false);
        setAppearancePage(false);
        setPrivacyPage(false);
        setLanguagePage(false);
    }

    if (!is_profile_page && !is_appear_page && !is_privacy_page && !is_lang_page) {
        return (
            <>
            <h2>Settings</h2>
            <ul id="settings-list">
                <li>
                    <button id="settings-icon">
                        <MdOutlinePersonOutline onClick={e => {             
                            e.preventDefault();                             // prevent default button behavior
                            toProfileSettings();                                 // add popup when implement CREATE, but straight to search now
                            navigate("/settings");
                    }}/>&nbsp; Profile Settings</button>
                </li>
                <li>
                    <button id="settings-icon">
                        <MdLightMode onClick={e => {
                            e.preventDefault();
                            toAppearanceSettings();
                            navigate("/settings");
                    }}/>&nbsp; Appearance</button>
                </li>
                <li>
                    <button id="settings-icon">
                        <MdLockPerson onClick={e => {
                            e.preventDefault();
                            toPrivacySecSettings();
                            navigate("/settings");
                        }}/>&nbsp; Privacy & Security</button>
                </li>
                <li>
                    <button id="settings-icon">
                        <MdLanguage onClick={e => {
                            e.preventDefault();
                            toLanguageSettings();
                            navigate("/settings");
                        }}/>&nbsp; Lanugage</button>
                </li>
            </ul>
        </>
        );
    } else if (is_profile_page) {
        return (
            <>
                <h2>Profile Settings</h2>
                <P_Form first_name={first_name} last_name={last_name} email={email} phone={phone} 
                    pimage={image} setFName={setFName} setLName={setLName} setEmail={setEmail} 
                    setPhone={setPhone} setImage={setImage} setUser={setUser} user_id={user_id} reset={reset}/>
            </>
        );
    } else if (is_appear_page) {
        return (
            <>
                <h2>Appearance Settings</h2>
                <A_Form appearance={appearance} setAppearance={setAppearance} setUser={setUser} user_id={user_id} reset={reset}/>
            </>
        );
    } else if (is_privacy_page){
        return (
            <>
                <h2>Privacy and Security Settings</h2>
                <Priv_Form password={password} setPassword={setPassword} setUser={setUser} user_id={user_id}  reset={reset}/>
            </>
        );
    } else if (is_lang_page){
        return (
            <>
                <h2>Language Settings</h2>
                <Lang_Form language={language} setLanguage={setLanguage} setUser={setUser} user_id={user_id} reset={reset}/>
            </>
        );
    }
};

export default Settings_Page;
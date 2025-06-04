export type Song = {
  id: string | number;
  title: string;
  artist: string;
  audio: string;
  image?: string;
};

export type Genre = {
  id: string | number;
  name: string;
  description?: string;
  themeColor?: string;
  bannerImage?: string;
  songs: Song[];
};

export const genreData: Genre[] = [
  {
    id: 1,
    name: "Pop",
    description: "Chart-topping hits and catchy melodies",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882240/1_xqlkdw.jpg",
    themeColor: "from-pink-400 via-pink-500 to-pink-600",
    songs: [
      {
        id: 101,
        title: "Levitating",
        artist: "Dua Lipa Ft. DaBaby",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748895332/Dua_Lipa_-_Levitating_Lyrics_ft._DaBaby_aafzei.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748882240/1_xqlkdw.jpg",
      },
      {
        id: 102,
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748895338/Harry_Styles_-_Watermelon_Sugar_Lyrics_fjjpgl.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748895339/5_tvrbed.jpg",
      },
      {
        id: 103,
        title: "Flowers",
        artist: "Miley Cyrus",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748922788/Miley_Cyrus_-_Flowers_Official_Video_exobd2.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748895344/2_cfjhjr.jpg",
      },
      {
        id: 104,
        title: "As It Was",
        artist: "Harry Styles",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748895333/Harry_Styles_-_As_It_Was_Lyrics_yjccfi.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748895340/4_epcj4v.jpg",
      },
      {
        id: 105,
        title: "Anti-Hero",
        artist: "Taylor Swift",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748895344/Taylor_Swift_-_Anti-Hero_Official_Lyric_Video_advfnm.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748895343/1_qktwnt.png",
      },
      {
        id: 106,
        title: "What Makes You Beautiful",
        artist: "One Direction",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748895343/One_Direction_-_What_Makes_You_Beautiful_Lyric_Video_t3d7uw.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748895342/3_v73d38.jpg",
      },
      {
        id: 107,
        title: "This is what winter feels like",
        artist: "JVKE",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748932938/JVKE_-_this_is_what_winter_feels_like_official_lyric_video_noygpq.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748932927/9_bfbyyv.jpg",
      },

    ],
  },
  {
    id: 2,
    name: "R&B",
    description: "Smooth vocals and groove-heavy rhythms",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882238/2_slekch.jpg",
    themeColor: "from-brown-400 via-orange-500 to-red-600",
    songs: [
      {
        id: 201,
        title: "Leave the Door Open",
        artist: "Silk Sonic",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748897832/Bruno_Mars_Anderson_.Paak_Silk_Sonic_-_Leave_the_Door_Open_Lyrics_hvh5sv.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748897844/2_oiulpk.jpg",
      },
      {
        id: 202,
        title: "Die With A Smile",
        artist: "Bruno Mars & Lady Gaga",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748897840/Lady_Gaga_Bruno_Mars_-_Die_With_A_Smile_Lyrics_wverub.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748897844/1_xdofho.jpg",
      },
      {
        id: 203,
        title: "Smokin Out the Window",
        artist: "Silk Sonic",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748897828/Bruno_Mars_Anderson_.Paak_Silk_Sonic_-_Smokin_Out_The_Window_Lyrics_ildd4r.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748897843/3_zrprjx.png",
      },
      {
        id: 204,
        title: "Earned It",
        artist: "The Weeknd",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748897845/The_Weeknd_-_Earned_It_from_Fifty_Shades_Of_Grey_Official_Lyric_Video_toy2ui.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748897843/4_tk4t18.png",
      },
      {
        id: 205,
        title: "Stay With Me",
        artist: "Sam Smith",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748897830/Sam_Smith_-_Stay_With_Me_Lyrics_wgy28e.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748897842/5_uhymws.jpg",
      },
      {
        id: 206,
        title: "Can't Feel My Face",
        artist: "The Weeknd",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748897845/CAN_T_FEEL_MY_FACE_-_THE_WEEKND_Lyrics_fo3ahr.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748897842/7_g7j89k.png",
      },
      {
        id: 207,
        title: "Golden",
        artist: "Jill Scott",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748897837/Jill_Scott_-_Golden_yagqmo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748897842/6_zeuinx.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Hip-Hop",
    description: "Urban beats with powerful lyrics",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748892810/14_oi8ene.jpg",
    themeColor: "from-zinc-400 via-slate-300 to-black-400",
    songs: [
      {
        id: 301,
        title: "God's Plan",
        artist: "Drake",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748934625/God_s_Plan_od4k6v.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748934635/1_kpcjsx.jpg",
      },
      {
        id: 302,
        title: "Not Like Us",
        artist: "Kendrick Lamar",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748934629/Kendrick_Lamar_-_Not_Like_Us_Lyrics_aizfnh.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748934639/8_d0jjnx.png",
      },
      {
        id: 303,
        title: "Industry Baby",
        artist: "Lil Nas X ft. Jack Harlow",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748934630/Lil_Nas_X_-_Industry_Baby_Lyrics_ft._Jack_Harlow_ljrsgf.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748934636/3_qtzffi.jpg",
      },
      {
        id: 304,
        title: "Still Wiz",
        artist: "Wiz Khalifa",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748934638/Wiz_Khalifa_-_Still_Wiz_Lyrics_a942ig.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748934637/5_z8mhap.jpg",
      },
      {
        id: 305,
        title: "FE!N",
        artist: "Travis Scott",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748934638/Travis_Scott_-_FE_N_Lyrics_f3vqjy.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748934635/2_i4ghbx.jpg",
      },
      {
        id: 306,
        title: "Big Dawgs",
        artist: "Hanumankind ft. Kalmi",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748934645/Hanumankind_Big_Dawgs_Lyrics_ft._Kalmi_wvq8bd.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748934640/9_a9sfj1.jpg",
      },
      {
        id: 307,
        title: "Rap God",
        artist: "Eminem",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748934650/Eminem_-_Rap_God_Lyrics_eebuhd.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748934640/7_iweoab.png",
      },
      {
        id: 308,
        title: "Young, Wild & Free",
        artist: "Wiz Khalifa & Snoop Dogg",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748934653/Wiz_Khalifa_and_Snoop_Dogg_-_Young_Wild_and_Free_HQ_Uncensored_ckvly3.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748934638/6_syagmb.jpg",
      },
      {
        id: 309,
        title: "First Class",
        artist: "Jack Harlow",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748934625/Jack_Harlow_-_First_Class_Lyrics_jbjgwg.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748934637/4_ousr1z.jpg",
      },            
    ],
  },
  {
    id: 4,
    name: "Alternative R&B",
    description: "Atmospheric R&B with experimental sounds",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882237/4_eixeod.jpg",
    themeColor: "from-blue-800 via-pink-700 to-violet-900",
    songs: [
      {
        id: 401,
        title: "Blinding Lights",
        artist: "The Weeknd",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748940858/The_Weeknd_-_Blinding_Lights_Lyrics_xxgph4.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748940662/1_hfpazm.png",
      },
      {
        id: 402,
        title: "Starboy",
        artist: "The Weeknd ft. Daft Punk",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748940860/The_Weeknd_-_Starboy_Lyrics_ft._Daft_Punk_zyxhiw.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748940661/2_hj5fz5.jpg",
      },
      {
        id: 403,
        title: "I Feel It Coming",
        artist: "The Weeknd ft. Daft Punk",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748940827/The_Weeknd_-_I_Feel_It_Coming_ft._Daft_Punk_Lyrics_ujolnb.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748940661/3_hxdwf6.jpg",
      },
      {
        id: 404,
        title: "The Hills",
        artist: "The Weeknd",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748940815/The_Weeknd_-_The_Hills_Lyrics_jlcqnr.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748940661/7_n5qqem.jpg",
      },
      {
        id: 405,
        title: "Heartless",
        artist: "The Weeknd",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748940813/The_Weeknd_-_Heartless_Lyrics_es99tf.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748940662/5_hy80ai.jpg",
      },
      {
        id: 406,
        title: "Is There Someone Else?",
        artist: "The Weeknd",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748940812/The_Weeknd_-_Is_There_Someone_Else_Lyrics_qninxs.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748940661/6_gj5drd.jpg",
      },
      {
        id: 407,
        title: "Out of Time",
        artist: "The Weeknd",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1748940810/The_Weeknd_-_Out_of_Time_Lyrics_wyrhmr.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1748940660/8_owh3zk.jpg",
      },                                   
    ],
  },
  {
    id: 5,
    name: "Electronic",
    description: "Synth beats and digital soundscapes",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748892810/13_om2src.jpg",
    themeColor: "from-green-800 via-cyan-700 to-blue-800",
    songs: [
      {
        id: 501,
        title: "Animals",
        artist: "Martin Garrix",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1749015424/Martin_Garrix_-_Animals_Original_Mix_-_Spinnin_Records_syt0tk.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1749015354/1_ol2ydl.png",
      },
      {
        id: 502,
        title: "I'm Good (Blue)",
        artist: "David Guetta & Bebe Rexha",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1749015422/David_Guetta_Bebe_Rexha_-_I_m_good_Blue_I_m_good_yeah_I_m_feelin_alright_-_LatinHype_ltvvqr.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1749015352/2_xbarya.jpg",
      },
      {
        id: 503,
        title: "Levels",
        artist: "Avicii",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1749015429/Avicii_-_Levels_Radio_Edit_wnqr2g.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1749015352/5_ebtwa5.jpg",
      },
      {
        id: 504,
        title: "Beautiful Now",
        artist: "Zedd ft. Jon Bellion",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1749015424/Zedd_-_Beautiful_Now_Lyrics_ft._Jon_Bellion_-_7clouds_oguudw.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1749015352/3_htqudq.jpg",
      },
      {
        id: 505,
        title: "SOS (Laidback Luke Tribute Remix)",
        artist: "Avicii",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1749015415/SOS_Laidback_Luke_Tribute_Remix_Radio_Edit_ghna3d.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1749015352/4_zzbvvj.png",
      },
      {
        id: 506,
        title: "Waiting For Tomorrow",
        artist: "Martin Garrix & Pierce Fulton feat. Mike Shinoda",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1749015421/Martin_Garrix_Pierce_Fulton_feat._Mike_Shinoda_-_Waiting_For_Tomorrow_Official_Video_juym1t.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1749015353/6_meviq7.jpg",
      },
    ],
  },
  {
    id: 6,
    name: "Rock",
    description: "Guitar-driven anthems with high energy",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882238/6_vz3wzd.jpg",
    themeColor: "from-red-900 via-orange-700 to-orange-200",
    songs: [
      {
        id: 601,
        title: "Chill Study Beats",
        artist: "Lo-Fi Producer",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504633/audio6_l3zfhr.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025641/6_gjaigz.jpg",
      },
      {
        id: 602,
        title: "Rainy Day",
        artist: "Mellow Tones",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504633/audio6_l3zfhr.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025641/6_gjaigz.jpg",
      },
    ],
  },
  {
    id: 7,
    name: "Indie",
    description: "Quirky, artistic pop with uniqueness",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882237/7_pfmpe5.jpg",
    themeColor: "from-emerald-400 via-blue-700 to-red-400",
    songs: [
      {
        id: 701,
        title: "Symphony No. 9",
        artist: "Orchestra Ensemble",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      },
      {
        id: 702,
        title: "Piano Concerto",
        artist: "Classical Masters",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },
  {
    id: 8,
    name: "Country",
    description: "Heartland storytelling with pop",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748892811/15_bhzlya.png",
    themeColor: "from-amber-500 via-yellow-500 to-orange-900",
    songs: [
      {
        id: 801,
        title: "Smooth Love",
        artist: "R&B Sensation",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
      {
        id: 802,
        title: "Groove Tonight",
        artist: "Soulful Artist",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },

    {
    id: 9,
    name: "Reggaeton",
    description: "Latin beats blended with modernism",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882237/9_wucilq.jpg",
    themeColor: "from-emerald-500 via-yellow-500 to-green-300",
    songs: [
      {
        id: 801,
        title: "Smooth Love",
        artist: "R&B Sensation",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
      {
        id: 802,
        title: "Groove Tonight",
        artist: "Soulful Artist",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },

    {
    id: 10,
    name: "Jazz",
    description: "Smooth improvisation with contemporary flair",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882236/10_vuicwt.jpg",
    themeColor: "from-red-500 via-yellow-500 to-purple-600",
    songs: [
      {
        id: 801,
        title: "Smooth Love",
        artist: "R&B Sensation",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
      {
        id: 802,
        title: "Groove Tonight",
        artist: "Soulful Artist",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },

    {
    id: 11,
    name: "Lo-Fi",
    description: "Ambient, mellow tones for relaxation",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882247/11_rozhlt.png",
    themeColor: "from-rose-500 via-indigo-500 to-pink-500",
    songs: [
      {
        id: 801,
        title: "Smooth Love",
        artist: "R&B Sensation",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
      {
        id: 802,
        title: "Groove Tonight",
        artist: "Soulful Artist",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },

    {
    id: 12,
    name: "Funk",
    description: "Groovy rhythms with retro throwbacks",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882237/12_fytawc.jpg",
    themeColor: "from-red-500 via-pink-600 to-violet-500",
    songs: [
      {
        id: 801,
        title: "Smooth Love",
        artist: "R&B Sensation",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },
];
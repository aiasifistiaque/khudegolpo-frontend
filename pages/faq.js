import React from 'react';
import Page from '../components/utilities/page/Page';
import PageCard from '../components/payment/refill/PageCard';
import FaqContainer from '../components/utilities/container/FaqContainer';

const faq = () => {
	return (
		<Page>
			<PageCard>
				<FaqContainer>
					<h3>Frequently Asked Questions</h3>
					<h6>YAYA AREWABOOKS TAKE AIKI NE?</h6>
					<p>
						ArewaBooks zata bawa marubuci damar wallafa/rubuta littafansa akan
						tsarin Parts/Chapters, sannan yana da ikon saka littafinsa a Free ko
						Paid akan kowani Chapter/Part.
					</p>
					<p>
						Sannan dakwai tsarin Followers/Following wanda wannan zaibawa
						mabiyanku/makaranta damar Following dinku, aduk sanda kuka wallafa
						littafi/Chapter zasu samu sanarwa (Notification) ta saman wayoyinsu.
					</p>
					<h6>TAYAYA ZAMU GA CINIKAIYARMU?</h6>
					<p>
						Acikin ArewaBooks akwai bayyanannen asusu (wallet) har kala biyu.
						Earning da Recharge/Refill.
					</p>
					<p>
						EARNING - itace ta masu wallafa littafai duk Chapter da aka saye
						kudin zai shiga wannan asusun (wallet).
					</p>
					<p>
						RECHARGE/REFILL - asusu ce ta makaranta kafin su iya sayen
						littafanku sai sunfara saka kudi ta ArewaBooks account dinsu, tau
						duk kudin da zasu saka acikin wannan asusun zai bayyana.
					</p>
					<h6>TOH TAYAYA MAKARANTA ZASU SAKA KUDI?</h6>
					<p>
						ArewaBooks ta saukaka hanyar da makaranta zasu saka kudi domin
						sayayyar littafan da suke muradi, har hanyoyi uku.
					</p>
					<ul>
						<li>Katin Banki (Debit/Credit Card) - Paystack gateway</li>
						<li>Local Bank Transfer - USSD, POS etc.</li>
						<li>
							Katin waya (Airtime transfer) - MTN, AIRTEL, GLO {`&`} 9MOBILE.
						</li>
					</ul>
					<h6>TAYAYA KUKE BIYAN MARUBUTA IDAN AN SAYE LITTAFANSU?</h6>
					<p>
						Dazarar asusun Earning (wallet) din marubuci takai 2,000 ko sama da
						hakan, a lokacin yake da damar mallakar kudinsa (withdrawal
						request). ArewaBooks zata aika masa kudin (payment) cikin lokaci
						kankani.
					</p>
					<h6>YAYA TSARON (Security) LITTAFANMU A AREWABOOKS?</h6>
					<p>
						ArewaBooks tayi kokarin samar da tsaro (security) ga littafai... A
						shafinmu (website) ko Manhaja (Application) babu damar wani ya danne
						rubutun har yayi copy/share.
					</p>
					<p>
						Sannan ArewaBooks tazo muku da wata tsarin kare littafanku daga
						barayin yanargizo ta hanyar zabar {`"Platform Specific"`}... Shi
						Platform Specific zaibawa marubuci damar zabar inda yakeson
						littafinsa ya bayyana kamar:
					</p>
					<ul>
						<li>All (Web and App)</li>
						<li>App Only</li>
					</ul>
					<p>
						All (Web and App) - idan ka zaba wannan yayin saka littafinka, tau
						zai bayyana duka a shafi (website) da Manhaja (Application).
					</p>
					<p>
						App Only - idan ka zaba wannan yayin saka littafi, tau zai bayyana
						ne kadai acikin Manhaja (Application) wanda shine zaikarawa littafin
						tsaro (security) idan yana cikin Manhaja ne kadai.
					</p>
					<p>
						Note: {`"App Only"`} yana rage yawan samun makarantar littafi, sai
						kayi tunanin wanne kafi bukata yawan security ko yawan makaranta.
					</p>
					<h6>
						INADA MABIYA DA YAWA A WATTPAD/WHATSAPP/FACEBOOK, TAYAYA KENAN
						ZANJANYOSU AREWABOOKS?
					</h6>
					<p>
						Ehh, Akwai hanyoyi/dabaru da dama, Amma zamu bada guda daya zuwa
						biyu.
					</p>
					<p>
						Idan ka bude account a ArewaBooks shine kayi kokarin dora tsofaffin
						littafanka aciki. Ko suna Wattpad ko basa Wattpad kafara wannan
						kokarin.
					</p>
					<p>
						Sannan sai kayi sanarwa a account dinka na Wattpad da sauran kafafar
						sadarwa WhatsApp/Facebook/Telegram da sauransu, da yawa mabiyanka
						zasu samu wannan sakon, har suyi following dinka a ArewaBooks.
					</p>
					<p>
						Sannan zaka iya fara sabon littafi a Wattpad account naka, sai aciki
						kayi sanarwan cigaban zaikasance a ArewaBooks. Haka zalika zaka iya
						cire karshen tsofin littafanka dasuke wattpad abar iya farkon, sai
						cikkaken yakasance a ArewaBooks account naka. Tabbas da yawan
						mabiyanka zasu biyoka suyi following naka a ArewaBooks.
					</p>
					<h6>MEYASA AREWABOOKS?</h6>
					<p>
						Mun kirkiri wannan shafin/manhaja ArewaBooks ne duba da irin halin
						da marubutan Arewa suke ciki ta kasuwancin littatafai ayanzu.
						Matsalar ta shafi kowa daga masu bugawan da masu wallafawa a
						yanargizo (online), Masu bugawan basu samun kasuwa kamar dacan
						kasancewar zuwan yanargizo (online), sai yazamana anfi amfani da
						wayar salula agun karatun littafai ayanzu. Sai marubutan da yawa
						suka dawo online saidai kash babu inda zasu siyar da littafan nasu
						cikin natsuwa da kwanciyar hankali. Da yawa suna sayarwa a WhatsApp
						ne, wasu kuwa a Free sukeyi badan komai ba sai dan son rubutun a
						jininsu yake shine muradinsu, wasu kuwa hakura suke da rubutun
						saboda takaicin canzawar yanayin.
					</p>
					<p>
						Wadannan sune kadan daga cikin dalilin dayasa aka samar da
						ArewaBooks.
					</p>
				</FaqContainer>
			</PageCard>
		</Page>
	);
};

export default faq;

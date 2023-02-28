import React from "react";
import uuid from "react-uuid"
// vaerables
import StandardBankLtd from "./assets/StandardBankLtd-bangla.svg"
import signatures from "./assets/IMG.png"

const Letter = ({ zeroBalance, bulkData, date, outlet, closeDate, branch }) => {
  return bulkData ? (
    bulkData.map(
      (
        { AccountNo, AccountTitel, GENDER, Spouse, Contact, Address, Balance },
        index
      ) =>
        !zeroBalance && Balance === 0 ? null : (
          <div className="page">
            <div className="columns container" style={{ padding: ".5rem" }}>
              <div className="column col-12">
                <div className="columns col-oneline">
                  <img
                    src={StandardBankLtd}
                    className="column col-5 col-md-5 logo img-responsive img-fit-contain"
                  />
                  <div
                    className="column container col-4 col-md-4 col-ml-auto mr-0"
                    style={{ color: "#006d2c" }}
                  >
                    <strong>প্রধান অফিস</strong>
                    <br />
                    মেট্রোপলিটন চেম্বার বিল্ডিং (তৃতীয় তলা) <br />
                    122-124 মতিঝিল সি/এ, ঢাকা-1000, বাংলাদেশ <br />
                    টেলিফোন: +8802-9578385 +8801709654772-3 ইমেইল:
                    agentbanking@standardbankbd.com <br />
                    ওয়েব: www.standardbankbd.com
                  </div>
                </div>
              </div>
              <span style={{ padding: "2rem" }}>
                <div className="column col-12 addrContainer mt-2">
                  <p className="text-break col-4">
                    <b>Date:</b> {date}
                    <br />
                    <br />
                    <br />
                    <h3 className="h3 text-capitalize">
                      {GENDER === "M"
                        ? "Mr. " + AccountTitel
                        : GENDER === "F" && Spouse != null
                          ? "Mrs. " + AccountTitel
                          : GENDER === "F" && Spouse === null
                            ? "Ms. " + AccountTitel
                            : AccountTitel}
                    </h3>
                    {Address ? <b>Address:</b> : null}
                    {Address ? Address.toString() : null}
                    <br />
                    {Contact ? <b>Contact:</b> : null}
                    {Contact ? Contact.toString() : null}
                  </p>
                  <br />
                </div>
                <div className="column col-12">
                  <section
                    className="container passage"
                  // style={{ lineHeight: "1.2rem" }}
                  >
                    সন্মানিত গ্রাহক,
                    <br /> আসসালামু আলাইকুম।
                    <br />
                    <br />
                    স্ট্যান্ডার্ড ব্যাংকের সাথে ব্যাংকিং করার জন্য আপনাকে
                    শুভেচ্ছা জানাচ্ছি।
                    <br />
                    <br />
                    অনিবার্য কারনবশতঃ স্ট্যান্ডার্ড ব্যাংক {outlet} বাজার এজেন্ট
                    আউটলেটটি অত্র স্থানে চলমান রাখা সম্ভব হচ্ছে না। তাই আগামী{" "}
                    {closeDate} হতে আপনাদেরকে আমাদের {branch} শাখা হতে ব্যাংকিং
                    সেবা গ্রহনের জন্য অনুরোধ করা হচ্ছে।
                    <br />
                    <br />
                    আমাদের সাথে হিসাব {AccountNo} অব্যাহত রাখতে চাইলে{" "}
                    {closeDate} তারিখের পূর্বেই আমাদের জানানোর জন্য অনুরোধ করা
                    যাচ্ছে। অন্যথায় {closeDate} তারিখের পূর্বে {outlet}
                    বাজার এজেন্ট আউটলেট হতে আপনার হিসাব বন্ধ করে হিসাবের সমুদয়
                    অর্থ গ্রহন করতে পারেন অথবা {closeDate} তারিখের পর আমাদের{" "}
                    {branch} শাখা হতে পে-অর্ডারের মাধ্যমে আপনার হিসাবের স্থিতি
                    গ্রহন করতে পারবেন। বিস্তারিত জানতে যোগাযোগ করুন-
                    ০১৭০৯৬৫৪৭৭২, ০১৭০৯৬৫৪৭৭৩।
                    <br />
                    <br />
                    আমাদের সাথে থাকার জন্য আপনাকে আবারও ধন্যবাদ।
                    <br />
                    <br />
                    <br />
                    শুভ কামনায়,
                    <br />
                    <br />
                    <img className="sig" src={signatures} />
                    <br />
                    <b>মনজুর মোরশেদ খান</b> <br />
                    ইন-চার্জ, এজেন্ট ব্যাংকিং ডিভিশন।
                  </section>
                </div>
              </span>
            </div>
            <p className="text-tiny text-muted text-center print-hide">
              <b> Page # </b>
              {index + 1}/{Object.keys(bulkData).length + 1},<br />
              {uuid()},<br />
              {new Date().toDateString()}
            </p>
            <footer></footer>
          </div>
        )
    )
  ) : (
    <div className="hero">
      <div className="hero-body text-center">
        <i className="icon icon-4x icon-people m-2"></i>
        <br />
        <h1 className="m-2">Select Agent From the list</h1>
      </div>
    </div>
  )
}

export default Letter

import { useState, useRef } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwB7a-pfJzIPBzfc7zH3kQi5IvPG9guEJBBlH2c-t7N66EDbpkWtJOWPQNGf2IMVCoI/exec";

const COLUMNS = [
  { key: "namaLengkap", label: "Nama Lengkap" },
  { key: "namaPanggilan", label: "Nama Panggilan" },
  { key: "jenisKelamin", label: "Jenis Kelamin" },
  { key: "nomorKK", label: "Nomor KK" },
  { key: "tempatLahir", label: "Tempat Lahir" },
  { key: "tanggalLahir", label: "Tanggal Lahir" },
  { key: "noRegAktaLahir", label: "No. Reg. Akta Lahir" },
  { key: "agama", label: "Agama" },
  { key: "kewarganegaraan", label: "Kewarganegaraan" },
  { key: "anakKeBerapa", label: "Anak ke Berapa" },
  { key: "anakKeDari", label: "Jumlah Saudara Kandung" },
  { key: "statusDalamKeluarga", label: "Status dalam Keluarga" },
  { key: "siswaTinggalBersama", label: "Siswa Tinggal Bersama" },
  { key: "tempatTinggal", label: "Tempat Tinggal" },
  { key: "transportasi", label: "Transportasi" },
  { key: "jalan", label: "Jalan/Dusun" },
  { key: "rt", label: "RT" },
  { key: "rw", label: "RW" },
  { key: "kelurahanDesa", label: "Kelurahan/Desa" },
  { key: "kecamatan", label: "Kecamatan" },
  { key: "kotaKabupaten", label: "Kota/Kabupaten" },
  { key: "propinsi", label: "Provinsi" },
  { key: "kodePos", label: "Kode Pos" },
  { key: "namaAyah", label: "Nama Ayah" },
  { key: "tempatLahirAyah", label: "Tempat Lahir Ayah" },
  { key: "agamaAyah", label: "Agama Ayah" },
  { key: "kewarganegaraanAyah", label: "Kewarganegaraan Ayah" },
  { key: "pendidikanAyah", label: "Pendidikan Ayah" },
  { key: "pekerjaanAyah", label: "Pekerjaan Ayah" },
  { key: "penghasilanAyah", label: "Penghasilan Ayah" },
  { key: "alamatKantorAyah", label: "Alamat Kantor Ayah" },
  { key: "alamatRumahAyah", label: "Alamat Rumah Ayah" },
  { key: "namaIbu", label: "Nama Ibu" },
  { key: "tempatLahirIbu", label: "Tempat Lahir Ibu" },
  { key: "agamaIbu", label: "Agama Ibu" },
  { key: "kewarganegaraanIbu", label: "Kewarganegaraan Ibu" },
  { key: "bahasaIbu", label: "Bahasa Ibu" },
  { key: "pendidikanIbu", label: "Pendidikan Ibu" },
  { key: "pekerjaanIbu", label: "Pekerjaan Ibu" },
  { key: "penghasilanIbu", label: "Penghasilan Ibu" },
  { key: "alamatRumahIbu", label: "Alamat Rumah Ibu" },
  { key: "namaWali", label: "Nama Wali" },
  { key: "tempatLahirWali", label: "Tempat Lahir Wali" },
  { key: "agamaWali", label: "Agama Wali" },
  { key: "kewarganegaraanWali", label: "Kewarganegaraan Wali" },
  { key: "bahasaWali", label: "Bahasa Wali" },
  { key: "pekerjaanWali", label: "Pekerjaan Wali" },
  { key: "alamatKantorWali", label: "Alamat Kantor Wali" },
  { key: "alamatRumahWali", label: "Alamat Rumah Wali" },
  { key: "tinggiBadan", label: "Tinggi Badan (cm)" },
  { key: "beratBadan", label: "Berat Badan (kg)" },
  { key: "lingkarKepala", label: "Lingkar Kepala (cm)" },
  { key: "jarakSekolahKm", label: "Jarak Sekolah (KM)" },
  { key: "jarakSekolahJam", label: "Jarak Sekolah (jam)" },
  { key: "jenisKesejahteraan", label: "Jenis Kesejahteraan" },
  { key: "nomorKartu", label: "Nomor Kartu" },
  { key: "namaDiKartu", label: "Nama di Kartu" },
  { key: "fotoSiswa", label: "Foto Siswa" },
  { key: "fotokopiAktaLahir", label: "Fotokopi Akta Kelahiran" },
  { key: "fotokopiKK", label: "Fotokopi KK" },
  { key: "fotokopiSktbTk", label: "Fotokopi SKTB TK" },
  { key: "kartuKesejahteraan", label: "Kartu Kesejahteraan" },
  { key: "fotoLulus", label: "Foto Lulus" },
  { key: "kelas", label: "Kelas" },
  { key: "rombel", label: "Rombel" },
  { key: "nisn", label: "NISN" },
  { key: "nis", label: "NIS" },
  { key: "nik", label: "NIK" },
  { key: "tahunLulus", label: "Tahun Lulus" },
];

const FILE_FIELDS = [
  { key: "fotokopiAktaLahir", label: "Fotokopi Akta Kelahiran" },
  { key: "fotokopiKK", label: "Fotokopi KK" },
  { key: "fotokopiSktbTk", label: "Fotokopi SKTB TK" },
  { key: "kartuKesejahteraan", label: "Kartu Kesejahteraan" },
  { key: "fotoSiswa", label: "Foto Siswa" },
  { key: "fotoLulus", label: "Foto Lulus" },
];

const EMPTY_FORM = COLUMNS.reduce((acc: { [key: string]: string }, col) => {
  acc[col.key] = "";
  return acc;
}, {});

const INPUT_CLASS =
  "peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white";
const LABEL_CLASS =
  "absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 pointer-events-none";

const FileUploadField = ({
  fieldKey,
  label,
  file,
  existingUrl,
  onChange,
}: {
  fieldKey: string;
  label: string;
  file: File | null;
  existingUrl: string | null;
  onChange: (key: string, file: File | null) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 transition-all">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-lg">
          📄
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
          {file ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full truncate max-w-xs">
                ✓ {file.name}
              </span>
              <button
                type="button"
                onClick={() => onChange(fieldKey, null)}
                className="text-xs text-red-500 hover:text-red-700 transition flex-shrink-0"
              >
                Hapus
              </button>
            </div>
          ) : existingUrl ? (
            <div className="flex items-center gap-2">
              <a
                href={existingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 underline truncate max-w-xs"
              >
                File tersimpan (klik untuk lihat)
              </a>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-xs text-amber-600 hover:text-amber-800 transition flex-shrink-0"
              >
                Ganti
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400">JPG / PNG · Maks 10 MB</p>
          )}
        </div>
        {!file && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex-shrink-0 px-3 py-1.5 bg-white border border-gray-300 text-gray-600 text-xs font-medium rounded-lg hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition shadow-sm"
          >
            Pilih File
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0] || null;
          if (f && f.size > 10 * 1024 * 1024) {
            alert("Ukuran file maksimal 10 MB");
            return;
          }
          onChange(fieldKey, f);
          e.target.value = "";
        }}
      />
    </div>
  );
};

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="md:col-span-2 mt-4 mb-2">
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-gradient-to-r from-blue-300 to-transparent" />
      <h2 className="text-lg font-semibold text-blue-700 whitespace-nowrap">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-l from-blue-300 to-transparent" />
    </div>
    {subtitle && (
      <p className="text-center text-sm text-gray-400 mt-1">{subtitle}</p>
    )}
  </div>
);

const F = ({
  name,
  label,
  required = false,
  full = false,
  type = "text",
  value,
  onChange,
  ...rest
}: {
  [x: string]: any;
  name: string;
  label: string;
  required?: boolean;
  full?: boolean;
  type?: string;
  value: any;
  onChange: (e: any) => void;
}) => (
  <div className={`relative${full ? " md:col-span-2" : ""}`}>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={INPUT_CLASS}
      placeholder=" "
      required={required}
      {...rest}
    />
    <label htmlFor={name} className={LABEL_CLASS}>
      {label}
      {required ? " *" : ""}
    </label>
  </div>
);

export default function PageForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    fotokopiAktaLahir: null,
    fotokopiKK: null,
    fotokopiSktbTk: null,
    kartuKesejahteraan: null,
    fotoSiswa: null,
  });
  const [status, setStatus] = useState("idle");
  const [successName, setSuccessName] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const numericOnlyFields = ["nomorKK", "nik"];
    const value = numericOnlyFields.includes(e.target.name)
      ? e.target.value.replace(/[^0-9]/g, "")
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFileChange = (key: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setUploadProgress("Memeriksa data duplikat...");

    try {
      // ── CEK DUPLIKAT ──
      const checkUrl = new URL(SCRIPT_URL);
      checkUrl.searchParams.set("action", "checkDuplicate");
      checkUrl.searchParams.set("nama", formData.namaLengkap.trim());
      checkUrl.searchParams.set("nik", formData.nik.trim());

      const checkRes = await fetch(checkUrl.toString());
      const checkJson = await checkRes.json();

      if (checkJson.duplicate) {
        alert(
          `⚠️ Data sudah ada!\n\n` +
            `${checkJson.field} yang Anda masukkan sudah terdaftar di sistem.\n` +
            `Silakan periksa kembali data yang diisi.`
        );
        setStatus("idle");
        setUploadProgress("");
        return;
      }

      setUploadProgress("Menyiapkan data...");

      const fileData: {
        [key: string]: {
          base64: string;
          mimeType: string;
          fileName: string;
        } | null;
      } = {};
      for (const fk of FILE_FIELDS.filter((f) => f.key !== "fotoLulus")) {
        const f = files[fk.key];
        if (f) {
          setUploadProgress(`Mengupload ${fk.label}...`);

          const compressedBase64 = await new Promise<string>(
            (resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;

                if (f.size <= 100 * 1024) {
                  resolve(result.split(",")[1]);
                  return;
                }

                const img = new Image();
                img.onload = () => {
                  const canvas = document.createElement("canvas");
                  let { width, height } = img;

                  const MAX_DIM = 1200;
                  if (width > MAX_DIM || height > MAX_DIM) {
                    if (width > height) {
                      height = Math.round((height * MAX_DIM) / width);
                      width = MAX_DIM;
                    } else {
                      width = Math.round((width * MAX_DIM) / height);
                      height = MAX_DIM;
                    }
                  }

                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext("2d")!;
                  ctx.drawImage(img, 0, 0, width, height);

                  const TARGET = 100 * 1024;
                  let quality = 0.9;

                  const compress = () => {
                    const base64 = canvas.toDataURL("image/jpeg", quality);
                    const estimatedSize =
                      (base64.length - "data:image/jpeg;base64,".length) * 0.75;

                    if (estimatedSize <= TARGET || quality <= 0.05) {
                      resolve(base64.split(",")[1]);
                    } else {
                      quality = Math.max(quality - 0.08, 0.05);
                      compress();
                    }
                  };

                  compress();
                };
                img.onerror = reject;
                img.src = result;
              };
              reader.onerror = reject;
              reader.readAsDataURL(f);
            }
          );

          fileData[fk.key] = {
            base64: compressedBase64,
            mimeType: "image/jpeg",
            fileName: f.name.replace(/\.(png|jpg|jpeg)$/i, ".jpg"),
          };
        } else {
          fileData[fk.key] = null;
        }
      }

      setUploadProgress("Mengirim data ke server...");

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tanggalLahir: formData.tanggalLahir
            ? formData.tanggalLahir.split("-").reverse().join("/")
            : "",
          kelas: "1",
          rombel: "",
          files: fileData,
        }),
      });

      if (response.ok || response.type === "opaque") {
        setSuccessName(formData.namaLengkap);
        setStatus("success");
        setUploadProgress("");
      } else {
        setStatus("error");
        setUploadProgress("");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setUploadProgress("");
    }
  };

  const WA_NUMBER = "6289521798599"; // ← ganti nomor WA sekolah

  // ✅ TAMBAHKAN DI SINI — tepat sebelum return utama
  if (status === "success" && successName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 shadow">
            Pendaftaran Berhasil
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {successName}
          </h2>
          <p className="text-gray-600 mb-1 text-sm">
            telah berhasil melakukan pendaftaran secara online di
          </p>
          <p className="text-blue-700 font-semibold mb-6">UPT SDN 2 BATANG</p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-amber-800 font-semibold text-sm mb-1">
              📸 Langkah Selanjutnya:
            </p>
            <ol className="text-amber-700 text-sm space-y-1 list-decimal list-inside">
              <li>Screenshot halaman ini sebagai bukti pendaftaran</li>
              <li>
                Kirim screenshot ke WhatsApp sekolah lewat tombol di bawah
              </li>
            </ol>
          </div>

          {/* Tombol WA — langsung buka chat */}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Assalamualaikum%2C%20saya%20ingin%20mengirimkan%20bukti%20pendaftaran%20online%20atas%20nama%20*${encodeURIComponent(
              successName
            )}*`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow transition w-full justify-center"
          >
            <span className="text-xl">💬</span>
            {" Kirim Bukti via WhatsApp"}
          </a>

          <p className="text-xs text-gray-400 mt-4">
            Simpan screenshot ini dan tunjukkan saat datang ke sekolah.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <div className="text-center mb-8">
        <div className="inline-block bg-blue-600 text-white px-6 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-3 shadow">
          Penerimaan Murid Baru
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 leading-tight">
          FORMULIR SPMB
        </h1>
        <p className="text-base md:text-lg font-semibold text-gray-600 mt-1">
          UPT SDN 2 BATANG
        </p>
        <div className="mt-4 h-1 w-24 bg-blue-500 rounded-full mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionHeader title="Data Pribadi Siswa" />
        <F
          name="namaLengkap"
          label="Nama Lengkap"
          required
          value={formData.namaLengkap}
          onChange={handleChange}
        />
        <F
          name="namaPanggilan"
          label="Nama Panggilan"
          value={formData.namaPanggilan}
          onChange={handleChange}
        />
        <div className="relative">
          <select
            name="jenisKelamin"
            id="jenisKelamin"
            value={formData.jenisKelamin}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
          >
            <option value="" disabled hidden></option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <label htmlFor="jenisKelamin" className={LABEL_CLASS}>
            Jenis Kelamin *
          </label>
        </div>
        <F
          name="nomorKK"
          label="Nomor KK"
          required
          inputMode="numeric"
          pattern="[0-9]*"
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            (e.target as HTMLInputElement).value = (
              e.target as HTMLInputElement
            ).value.replace(/[^0-9]/g, "");
          }}
          value={formData.nomorKK}
          onChange={handleChange}
        />
        <F
          name="nik"
          label="NIK (Nomor Induk Kependudukan)"
          required
          inputMode="numeric"
          pattern="[0-9]*"
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            (e.target as HTMLInputElement).value = (
              e.target as HTMLInputElement
            ).value.replace(/[^0-9]/g, "");
          }}
          value={formData.nik}
          onChange={handleChange}
        />
        <F
          name="tempatLahir"
          label="Tempat Lahir"
          required
          value={formData.tempatLahir}
          onChange={handleChange}
        />
        <F
          name="tanggalLahir"
          label="Tanggal Lahir"
          required
          type="date"
          value={formData.tanggalLahir}
          onChange={handleChange}
        />
        <F
          name="noRegAktaLahir"
          label="No. Reg. Akta Lahir"
          value={formData.noRegAktaLahir}
          onChange={handleChange}
        />
        <div className="relative">
          <select
            name="agama"
            id="agama"
            value={formData.agama}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            <option value="Islam">Islam</option>
            <option value="Kristen Protestan">Kristen Protestan</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
          <label htmlFor="agama" className={LABEL_CLASS}>
            Agama
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="kewarganegaraan"
            id="kewarganegaraan"
            value={formData.kewarganegaraan}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder=" "
            list="list-kewarganegaraan"
          />
          <label htmlFor="kewarganegaraan" className={LABEL_CLASS}>
            Kewarganegaraan
          </label>
          <datalist id="list-kewarganegaraan">
            <option value="Indonesia" />
          </datalist>
        </div>
        <div className="relative">
          <select
            name="anakKeBerapa"
            id="anakKeBerapa"
            value={formData.anakKeBerapa}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <label htmlFor="anakKeBerapa" className={LABEL_CLASS}>
            Anak ke Berapa
          </label>
        </div>
        <div className="relative">
          <select
            name="anakKeDari"
            id="anakKeDari"
            value={formData.anakKeDari}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <label htmlFor="anakKeDari" className={LABEL_CLASS}>
            Jumlah Saudara Kandung
          </label>
        </div>
        <F
          name="statusDalamKeluarga"
          label="Status dalam Keluarga"
          value={formData.statusDalamKeluarga}
          onChange={handleChange}
        />
        <div className="relative">
          <select
            name="siswaTinggalBersama"
            id="siswaTinggalBersama"
            value={formData.siswaTinggalBersama}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            <option value="Orang Tua">Orang Tua</option>
            <option value="Famili Lain">Famili Lain</option>
          </select>
          <label htmlFor="siswaTinggalBersama" className={LABEL_CLASS}>
            Siswa Tinggal Bersama
          </label>
        </div>
        <F
          name="tempatTinggal"
          label="Tempat Tinggal Saat Ini"
          value={formData.tempatTinggal}
          onChange={handleChange}
        />
        <div className="relative">
          <select
            name="transportasi"
            id="transportasi"
            value={formData.transportasi}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            <option value="Jalan Kaki">Jalan Kaki</option>
            <option value="Sepeda">Sepeda</option>
            <option value="Motor">Motor</option>
            <option value="Mobil">Mobil</option>
          </select>
          <label htmlFor="transportasi" className={LABEL_CLASS}>
            Transportasi ke Sekolah
          </label>
        </div>

        <SectionHeader title="Alamat Siswa" />
        <F
          name="jalan"
          label="Jalan / Dusun"
          full
          value={formData.jalan}
          onChange={handleChange}
        />
        <F name="rt" label="RT" value={formData.rt} onChange={handleChange} />
        <F name="rw" label="RW" value={formData.rw} onChange={handleChange} />
        <F
          name="kelurahanDesa"
          label="Kelurahan / Desa"
          value={formData.kelurahanDesa}
          onChange={handleChange}
        />
        <div className="relative">
          <input
            type="text"
            name="kecamatan"
            id="kecamatan"
            value={formData.kecamatan}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder=" "
            list="list-kecamatan"
          />
          <label htmlFor="kecamatan" className={LABEL_CLASS}>
            Kecamatan
          </label>
          <datalist id="list-kecamatan">
            <option value="Batang" />
          </datalist>
        </div>
        <div className="relative">
          <input
            type="text"
            name="kotaKabupaten"
            id="kotaKabupaten"
            value={formData.kotaKabupaten}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder=" "
            list="list-kota"
          />
          <label htmlFor="kotaKabupaten" className={LABEL_CLASS}>
            Kota / Kabupaten
          </label>
          <datalist id="list-kota">
            <option value="Jeneponto" />
          </datalist>
        </div>
        <div className="relative">
          <input
            type="text"
            name="propinsi"
            id="propinsi"
            value={formData.propinsi}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder=" "
            list="list-provinsi"
          />
          <label htmlFor="propinsi" className={LABEL_CLASS}>
            Provinsi
          </label>
          <datalist id="list-provinsi">
            <option value="Sulawesi Selatan" />
          </datalist>
        </div>
        <F
          name="kodePos"
          label="Kode Pos"
          value={formData.kodePos}
          onChange={handleChange}
        />

        <SectionHeader title="Data Orang Tua — Ayah" />
        <F
          name="namaAyah"
          label="Nama Ayah"
          value={formData.namaAyah}
          onChange={handleChange}
        />
        <F
          name="tempatLahirAyah"
          label="Tempat Lahir Ayah"
          value={formData.tempatLahirAyah}
          onChange={handleChange}
        />
        <div className="relative">
          <select
            name="agamaAyah"
            id="agamaAyah"
            value={formData.agamaAyah}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            <option value="Islam">Islam</option>
            <option value="Kristen Protestan">Kristen Protestan</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
          <label htmlFor="agamaAyah" className={LABEL_CLASS}>
            Agama Ayah
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="kewarganegaraanAyah"
            id="kewarganegaraanAyah"
            value={formData.kewarganegaraanAyah}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder=" "
            list="list-kewarganegaraan"
          />
          <label htmlFor="kewarganegaraanAyah" className={LABEL_CLASS}>
            Kewarganegaraan Ayah
          </label>
          <datalist id="list-kewarganegaraan">
            <option value="Indonesia" />
          </datalist>
        </div>
        <div className="relative">
          <select
            name="pendidikanAyah"
            id="pendidikanAyah"
            value={formData.pendidikanAyah}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            <option value="Tidak Tamat SD">Tidak Tamat SD</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>
          <label htmlFor="pendidikanAyah" className={LABEL_CLASS}>
            Pendidikan Ayah
          </label>
        </div>
        <F
          name="pekerjaanAyah"
          label="Pekerjaan Ayah"
          value={formData.pekerjaanAyah}
          onChange={handleChange}
        />
        <div className="relative">
          <select
            name="penghasilanAyah"
            id="penghasilanAyah"
            value={formData.penghasilanAyah}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            <option value="Kurang dari Rp 1.000.000">
              Kurang dari Rp 1.000.000
            </option>
            <option value="Rp 1.000.000 - Rp 3.000.000">
              Rp 1.000.000 - Rp 3.000.000
            </option>
            <option value="Di atas Rp 3.000.000">Di atas Rp 3.000.000</option>
          </select>
          <label htmlFor="penghasilanAyah" className={LABEL_CLASS}>
            Penghasilan Ayah per Bulan
          </label>
        </div>
        <F
          name="alamatKantorAyah"
          label="Alamat Kantor Ayah"
          value={formData.alamatKantorAyah}
          onChange={handleChange}
        />
        <F
          name="alamatRumahAyah"
          label="Alamat Rumah Ayah"
          full
          value={formData.alamatRumahAyah}
          onChange={handleChange}
        />

        <SectionHeader title="Data Orang Tua — Ibu" />
        <F
          name="namaIbu"
          label="Nama Lengkap Ibu"
          value={formData.namaIbu}
          onChange={handleChange}
        />
        <F
          name="tempatLahirIbu"
          label="Tempat Lahir Ibu"
          value={formData.tempatLahirIbu}
          onChange={handleChange}
        />
        <div className="relative">
          <select
            name="agamaIbu"
            id="agamaIbu"
            value={formData.agamaIbu}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            <option value="Islam">Islam</option>
            <option value="Kristen Protestan">Kristen Protestan</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
          <label htmlFor="agamaIbu" className={LABEL_CLASS}>
            Agama Ibu
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="kewarganegaraanIbu"
            id="kewarganegaraanIbu"
            value={formData.kewarganegaraanIbu}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder=" "
            list="list-kewarganegaraan"
          />
          <label htmlFor="kewarganegaraanIbu" className={LABEL_CLASS}>
            Kewarganegaraan Ibu
          </label>
          <datalist id="list-kewarganegaraan">
            <option value="Indonesia" />
          </datalist>
        </div>
        <F
          name="bahasaIbu"
          label="Bahasa Ibu Sehari-hari"
          value={formData.bahasaIbu}
          onChange={handleChange}
        />
        <div className="relative">
          <select
            name="pendidikanIbu"
            id="pendidikanIbu"
            value={formData.pendidikanIbu}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            <option value="Tidak Tamat SD">Tidak Tamat SD</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>
          <label htmlFor="pendidikanIbu" className={LABEL_CLASS}>
            Pendidikan Ibu
          </label>
        </div>
        <F
          name="pekerjaanIbu"
          label="Pekerjaan Ibu"
          value={formData.pekerjaanIbu}
          onChange={handleChange}
        />
        <div className="relative">
          <select
            name="penghasilanIbu"
            id="penghasilanIbu"
            value={formData.penghasilanIbu}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            <option value="Kurang dari Rp 1.000.000">
              Kurang dari Rp 1.000.000
            </option>
            <option value="Rp 1.000.000 - Rp 3.000.000">
              Rp 1.000.000 - Rp 3.000.000
            </option>
            <option value="Di atas Rp 3.000.000">Di atas Rp 3.000.000</option>
          </select>
          <label htmlFor="penghasilanIbu" className={LABEL_CLASS}>
            Penghasilan Ibu per Bulan
          </label>
        </div>
        <F
          name="alamatRumahIbu"
          label="Alamat Rumah Ibu"
          full
          value={formData.alamatRumahIbu}
          onChange={handleChange}
        />

        <SectionHeader
          title="Data Wali"
          subtitle="Isi jika ada wali selain orang tua"
        />
        <F
          name="namaWali"
          label="Nama Lengkap Wali"
          value={formData.namaWali}
          onChange={handleChange}
        />
        <F
          name="tempatLahirWali"
          label="Tempat Lahir Wali"
          value={formData.tempatLahirWali}
          onChange={handleChange}
        />
        <div className="relative">
          <select
            name="agamaWali"
            id="agamaWali"
            value={formData.agamaWali}
            onChange={handleChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled hidden></option>
            <option value="Islam">Islam</option>
            <option value="Kristen Protestan">Kristen Protestan</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
          <label htmlFor="agamaWali" className={LABEL_CLASS}>
            Agama Wali
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="kewarganegaraanWali"
            id="kewarganegaraanWali"
            value={formData.kewarganegaraanWali}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder=" "
            list="list-kewarganegaraan"
          />
          <label htmlFor="kewarganegaraanWali" className={LABEL_CLASS}>
            Kewarganegaraan Wali
          </label>
          <datalist id="list-kewarganegaraan">
            <option value="Indonesia" />
          </datalist>
        </div>
        <F
          name="bahasaWali"
          label="Bahasa Wali Sehari-hari"
          value={formData.bahasaWali}
          onChange={handleChange}
        />
        <F
          name="pekerjaanWali"
          label="Pekerjaan Wali"
          value={formData.pekerjaanWali}
          onChange={handleChange}
        />
        <F
          name="alamatKantorWali"
          label="Alamat Kantor Wali"
          value={formData.alamatKantorWali}
          onChange={handleChange}
        />
        <F
          name="alamatRumahWali"
          label="Alamat Rumah Wali"
          value={formData.alamatRumahWali}
          onChange={handleChange}
        />

        <SectionHeader title="Data Fisik" />
        <F
          name="tinggiBadan"
          label="Tinggi Badan (cm)"
          type="number"
          inputMode="numeric"
          value={formData.tinggiBadan}
          onChange={handleChange}
        />
        <F
          name="beratBadan"
          label="Berat Badan (kg)"
          type="number"
          inputMode="numeric"
          value={formData.beratBadan}
          onChange={handleChange}
        />
        <F
          name="lingkarKepala"
          label="Lingkar Kepala (cm)"
          type="number"
          inputMode="numeric"
          value={formData.lingkarKepala}
          onChange={handleChange}
        />
        <F
          name="jarakSekolahKm"
          label="Jarak ke Sekolah (KM)"
          type="number"
          inputMode="numeric"
          value={formData.jarakSekolahKm}
          onChange={handleChange}
        />
        <F
          name="jarakSekolahJam"
          label="Jarak ke Sekolah (jam/menit)"
          type="number"
          inputMode="numeric"
          value={formData.jarakSekolahJam}
          onChange={handleChange}
        />

        <SectionHeader title="Data Kesejahteraan" />
        <F
          name="jenisKesejahteraan"
          label="Jenis Kesejahteraan"
          value={formData.jenisKesejahteraan}
          onChange={handleChange}
        />
        <F
          name="nomorKartu"
          label="Nomor Kartu"
          value={formData.nomorKartu}
          onChange={handleChange}
        />
        <F
          name="namaDiKartu"
          label="Nama di Kartu"
          value={formData.namaDiKartu}
          onChange={handleChange}
        />

        <SectionHeader
          title="Upload Dokumen"
          subtitle="Format: PDF, JPG, atau PNG · Maks 10 MB per file"
        />
        <div className="md:col-span-2 grid grid-cols-1 gap-4">
          {FILE_FIELDS.filter((ff) => ff.key !== "fotoLulus").map((ff) => (
            <FileUploadField
              key={ff.key}
              fieldKey={ff.key}
              label={ff.label}
              file={files[ff.key]}
              existingUrl={null}
              onChange={handleFileChange}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 text-center" style={{ minHeight: 28 }}>
        {status === "loading" && (
          <p className="text-blue-600 font-medium">
            {uploadProgress || "Sedang mengirim data..."}
          </p>
        )}
        {status === "success" && (
          <p className="text-green-600 font-medium text-lg">
            ✓ Data berhasil dikirim! Terima kasih.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-medium">
            Gagal mengirim data. Silakan coba lagi.
          </p>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={status === "loading"}
          style={{ background: "#2563eb" }}
          className="inline-flex px-12 py-4 text-white font-semibold text-lg rounded-xl shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Mengirim..." : "Kirim Data Pendaftaran"}
        </button>
      </div>
    </form>
  );
}

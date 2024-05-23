import type { data as dataType } from "./types/data"; //Import types data
import type { Server, Socket } from "net"; //import some type from net
import * as net from "net"; // import everyhing from net

//Buat kelas Notes (0w0)/
class Notes {
  data: dataType[];
  constructor() {
    this.data = [
      {
        origin: "www.fathin.my.id",
        short: "fathin",
      },
    ]; //* init data pertama :3
  }
  getData() {
    return JSON.stringify(this.data); //Return semua data dalam string
  }
  postData(origin: string) {
    const short: string = btoa(btoa(origin)); //bikin unique id
    this.data.push({
      origin: origin,
      short: short,
    }); //push datanya (^w^)/
    console.log(this.data);
  }
  getSpecific(short: string) {
    const isThereInData: dataType | undefined = this.data.find(
      (entry) => entry.short == short,
    ); //! Cari ada atau enggak datanya
    if (isThereInData) return JSON.stringify(isThereInData); //kalau ada send saja, buat redirect (0w0)/
    return JSON.stringify({
      origin: "not found",
      short: "not found",
    }); //? Kalau gak ada, kasih not found
  }
}
const notes: Notes = new Notes(); //initilize kelasnya (*w*)/

//Dari sini mulai sulit, tapi santai aja :3
const app: Server = net.createServer((socket: Socket) => {
  //bikin server dulu
  socket.on("data", (dataCl) => {
    //kalau ada data
    const request = dataCl.toString(); //cek request dulu xixi
    var to_array = request.split("\r\n"); //ah dibikin ke array
    const [method, path, http_version] = to_array[0].split(" "); //cari posisinya, dia ada method, path, http_version
    const body = request.split("\r\n\r\n")[1]; //? ah untuk body di no.1
    //Header biar gak ngulang
    const header: string =
      "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\n\r\n";
    if (method == "GET" && path == "/getData") {
      //Buat dapatin semua data
      let clientData = notes.getData();
      socket.write(header + clientData); //? kirim datanya
    } else if (method == "POST" && path == "/postData") {
      //buat post sebuah data
      notes.postData(JSON.parse(body).origin);
      socket.write(header); //kirim header aja
    } else if (method == "POST" && path == "/getSpecific") {
      //dapatin suatu data dari short
      const search = notes.getSpecific(JSON.parse(body).short);
      socket.write(header + search); //kirimkan hasil yang didapat
    } else socket.write("HTTP/1.1 404 Not Found\r\n\r\n"); //! Kalau gak ada semua, 404 Not Found
    socket.end(); //di end socketnya
  });
});
app.listen(3000, () => console.log("[app] Server run at 3000")); //Nah disini run servernya

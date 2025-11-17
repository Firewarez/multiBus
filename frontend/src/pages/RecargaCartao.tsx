import React, { useState } from "react";
import {
  Loader2,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Wallet,
  History,
  DollarSign,
  Smartphone,
  RefreshCcw,
  ArrowLeftRight,
} from "lucide-react";

// Função para simular busca do cartão pelo CPF
function buscarCartaoPorCPF(cpf: string) {
  if (cpf === "12345678900") return "73519";
  if (cpf === "11122233344") return "52096";
  if (cpf === "224466880011") return "33279";
  if (cpf === "11678932190") return "32790";
  return null;
}

export default function RecargaCartao() {
  const [valor, setValor] = useState(0);
  const [numCartao, setNumCartao] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [pagamento, setPagamento] = useState<"pix" | "cartao">("pix");
  const [mostrarModal, setMostrarModal] = useState(false);

  const [saldo, setSaldo] = useState(32.5);
  const [historico, setHistorico] = useState<
    { valor: number; cashback: number; metodo: string; data: string }[]
  >([]);

  const abrirModal = () => {
    if (!numCartao || valor <= 0) {
      setError("Preencha o número do cartão e o valor.");
      return;
    }
    setError("");
    setMostrarModal(true);
  };

  const confirmarRecarga = () => {
    setMostrarModal(false);
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Cashback de 5%
      const cashback = valor * 0.05;

      // Atualizar saldo
      setSaldo((prev) => prev + valor + cashback);

      // Adicionar ao histórico
      setHistorico((prev) => [
        {
          valor,
          cashback,
          metodo: pagamento === "pix" ? "PIX" : "Cartão",
          data: new Date().toLocaleString("pt-BR"),
        },
        ...prev,
      ]);

      // Limpar campos
      setValor(0);
    }, 2000);
  };

  const recuperarPorCPF = () => {
    const encontrado = buscarCartaoPorCPF(cpf);
    if (encontrado) {
      setNumCartao(encontrado);
      setError("");
    } else {
      setError("Nenhum cartão encontrado para esse CPF.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-12 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 space-y-8">

        {/* SALDO */}
        <div className="bg-green-600 text-white rounded-xl p-6 shadow-md flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Saldo do Cartão</p>
            <p className="text-4xl font-bold mt-1">R$ {saldo.toFixed(2)}</p>
          </div>
          <Wallet size={50} />
        </div>

        {/* RECUPERAR POR CPF */}
        <div className="bg-gray-50 p-4 rounded-xl border">
          <p className="font-semibold mb-2 flex gap-2 items-center">
            <RefreshCcw size={18} /> Recuperar cartão pelo CPF
          </p>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="col-span-2 px-4 py-2 border rounded-lg"
            />
            <button
              className="bg-blue-600 text-white rounded-lg px-3 hover:bg-blue-700"
              onClick={recuperarPorCPF}
            >
              Buscar
            </button>
          </div>
        </div>

        {/* CAMPOS */}
        <div className="space-y-2">
          <label className="font-semibold text-gray-700">Número do Cartão</label>
          <input
            type="text"
            placeholder="Digite o número do cartão"
            value={numCartao}
            onChange={(e) => setNumCartao(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-gray-700">Valor da Recarga (R$)</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        {/* MÉTODO DE PAGAMENTO */}
        <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
          <button
            onClick={() => setPagamento("pix")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              pagamento === "pix" ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            <Smartphone size={18} /> PIX
          </button>

          <button
            onClick={() => setPagamento("cartao")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              pagamento === "cartao" ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            <CreditCard size={18} /> Cartão
          </button>
        </div>

        {/* ERRO */}
        {error && (
          <p className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={18} /> {error}
          </p>
        )}

        {/* SUCESSO */}
        {success && (
          <p className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle size={18} /> Recarga concluída!
          </p>
        )}

        {/* BOTÃO */}
        <button
          className="w-full py-4 bg-green-600 text-white rounded-xl text-lg font-semibold"
          onClick={abrirModal}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" /> Processando...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <DollarSign /> Continuar
            </span>
          )}
        </button>

        {/* HISTÓRICO */}
        <div className="pt-6">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
            <History size={20} /> Histórico de Recargas
          </h2>

          {historico.length === 0 && (
            <p className="text-gray-500 text-sm">Nenhuma recarga realizada.</p>
          )}

          <div className="space-y-3">
            {historico.map((h, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gray-50 border animate-[fadeIn_0.4s]"
              >
                <p className="font-semibold">+ R$ {h.valor.toFixed(2)}</p>
                <p className="text-green-600 text-sm">
                  Cashback: R$ {h.cashback.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  Método: {h.metodo} • {h.data}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL DE CONFIRMAÇÃO */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-lg space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ArrowLeftRight size={20} /> Confirmar Recarga
            </h2>

            <p className="text-gray-700">
              <strong>Valor:</strong> R$ {valor.toFixed(2)}
            </p>
            <p className="text-gray-700">
              <strong>Método:</strong> {pagamento === "pix" ? "PIX" : "Cartão"}
            </p>
            <p className="text-gray-700">
              <strong>Cashback:</strong> R$ {(valor * 0.05).toFixed(2)}
            </p>

            <div className="flex gap-3 pt-4">
              <button
                className="w-full py-2 rounded-lg bg-gray-300"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>

              <button
                className="w-full py-2 rounded-lg bg-green-600 text-white"
                onClick={confirmarRecarga}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

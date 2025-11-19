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
  Battery,
  ArrowLeft,
  Zap,
} from "lucide-react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Fab,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  LinearProgress,
  Container,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Brightness4, Brightness7, Search, AccountBalance } from "@mui/icons-material";

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
  const [darkMode, setDarkMode] = useState(false);
  const [autoRecarga, setAutoRecarga] = useState(false);
  const navigate = useNavigate();

  const [saldo, setSaldo] = useState(32.5);
  const [historico, setHistorico] = useState<
    { valor: number; cashback: number; metodo: string; data: string; id: string }[]
  >([
    {
      id: "1",
      valor: 20.0,
      cashback: 1.0,
      metodo: "PIX",
      data: "15/12/2024 14:30"
    },
    {
      id: "2", 
      valor: 50.0,
      cashback: 2.5,
      metodo: "Cartão",
      data: "10/12/2024 09:15"
    }
  ]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const valoresSugeridos = [5, 10, 20, 50, 100];

  const abrirModal = () => {
    if (!numCartao || valor <= 0) {
      setError("Preencha o número do cartão e o valor.");
      return;
    }
    if (valor < 5) {
      setError("O valor mínimo para recarga é R$ 5,00");
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
      const novaRecarga = {
        id: Date.now().toString(),
        valor,
        cashback,
        metodo: pagamento === "pix" ? "PIX" : "Cartão",
        data: new Date().toLocaleString("pt-BR"),
      };

      setHistorico((prev) => [novaRecarga, ...prev]);

      // Limpar campos
      setValor(0);
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  const recuperarPorCPF = () => {
    if (!cpf) {
      setError("Digite um CPF para buscar.");
      return;
    }
    
    const encontrado = buscarCartaoPorCPF(cpf);
    if (encontrado) {
      setNumCartao(encontrado);
      setError("");
    } else {
      setError("Nenhum cartão encontrado para esse CPF.");
    }
  };

  const formatarCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
        color: darkMode ? "#f1f5f9" : "#1e293b",
        transition: "all 0.4s ease-in-out",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorativo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40vh",
          background: darkMode 
            ? "linear-gradient(135deg, #059669 0%, #0ea5e9 100%)"
            : "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CreditCard size={32} className={darkMode ? "text-green-300" : "text-green-600"} />
            </motion.div>
            <div>
              <Typography
                variant="h3"
                className={`font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}
              >
                Recarga de Cartão
              </Typography>
              <Typography
                variant="subtitle1"
                className={darkMode ? "text-slate-300" : "text-slate-600"}
              >
                Recarregue seu cartão de transporte com facilidade
              </Typography>
            </div>
          </div>

          <Tooltip title={darkMode ? "Modo claro" : "Modo escuro"}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton 
                onClick={toggleDarkMode}
                sx={{
                  backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(100, 116, 139, 0.1)",
                  color: darkMode ? "#22c55e" : "#64748b",
                  '&:hover': {
                    backgroundColor: darkMode ? "rgba(34, 197, 94, 0.2)" : "rgba(100, 116, 139, 0.2)",
                  }
                }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </motion.div>
          </Tooltip>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Card de Saldo */}
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card
                sx={{
                  background: darkMode
                    ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                    : "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                  color: "white",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="h6" className="font-semibold opacity-90">
                        Saldo do Cartão
                      </Typography>
                      <Typography variant="h3" className="font-bold mt-2">
                        R$ {saldo.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" className="opacity-90 mt-1">
                        {numCartao ? `Cartão: ${numCartao}` : "Informe o número do cartão"}
                      </Typography>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Wallet size={48} className="opacity-90" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recuperação por CPF */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card
                sx={{
                  background: darkMode
                    ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                  borderRadius: 3,
                }}
              >
                <CardContent className="p-4">
                  <Typography 
                    variant="h6" 
                    className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    <RefreshCcw size={20} /> Recuperar cartão pelo CPF
                  </Typography>
                  
                  <div className="flex gap-3">
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Digite o CPF"
                      value={cpf}
                      onChange={(e) => setCpf(formatarCPF(e.target.value))}
                      sx={{
                        backgroundColor: darkMode ? "#334155" : "white",
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: darkMode ? '#475569' : '#cbd5e1',
                          },
                          '&:hover fieldset': {
                            borderColor: darkMode ? '#22c55e' : '#10b981',
                          },
                        }
                      }}
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        onClick={recuperarPorCPF}
                        startIcon={<Search />}
                        sx={{
                          backgroundColor: darkMode ? "#22c55e" : "#10b981",
                          color: "white",
                          whiteSpace: 'nowrap',
                          '&:hover': {
                            backgroundColor: darkMode ? "#16a34a" : "#059669",
                          }
                        }}
                      >
                        Buscar
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Formulário de Recarga */}
            <Card
              sx={{
                background: darkMode
                  ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                borderRadius: 3,
              }}
            >
              <CardContent className="p-6 space-y-6">
                {/* Número do Cartão */}
                <div>
                  <Typography 
                    variant="h6" 
                    className={`font-semibold mb-3 ${darkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    Número do Cartão
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Digite o número do cartão"
                    value={numCartao}
                    onChange={(e) => setNumCartao(e.target.value)}
                    sx={{
                      backgroundColor: darkMode ? "#334155" : "white",
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: darkMode ? '#475569' : '#cbd5e1',
                        },
                        '&:hover fieldset': {
                          borderColor: darkMode ? '#22c55e' : '#10b981',
                        },
                      }
                    }}
                  />
                </div>

                {/* Valor da Recarga */}
                <div>
                  <Typography 
                    variant="h6" 
                    className={`font-semibold mb-3 ${darkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    Valor da Recarga
                  </Typography>
                  
                  {/* Valores Sugeridos */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {valoresSugeridos.map((valorSugerido) => (
                      <motion.div
                        key={valorSugerido}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Chip
                          label={`R$ ${valorSugerido}`}
                          onClick={() => setValor(valorSugerido)}
                          variant={valor === valorSugerido ? "filled" : "outlined"}
                          sx={{
                            backgroundColor: valor === valorSugerido
                              ? darkMode ? "rgba(34, 197, 94, 0.2)" : "rgba(16, 185, 129, 0.2)"
                              : "transparent",
                            borderColor: darkMode ? "#22c55e" : "#10b981",
                            color: darkMode ? "#22c55e" : "#10b981",
                            fontWeight: 'bold',
                            cursor: "pointer",
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <TextField
                    fullWidth
                    type="number"
                    placeholder="Digite o valor"
                    value={valor || ''}
                    onChange={(e) => setValor(Number(e.target.value))}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DollarSign size={20} className={darkMode ? "text-slate-400" : "text-slate-600"} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      backgroundColor: darkMode ? "#334155" : "white",
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: darkMode ? '#475569' : '#cbd5e1',
                        },
                        '&:hover fieldset': {
                          borderColor: darkMode ? '#22c55e' : '#10b981',
                        },
                      }
                    }}
                  />
                </div>

                {/* Método de Pagamento */}
                <div>
                  <Typography 
                    variant="h6" 
                    className={`font-semibold mb-3 ${darkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    Método de Pagamento
                  </Typography>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Card
                        className={`cursor-pointer border-2 transition-all ${
                          pagamento === "pix" 
                            ? darkMode ? "border-green-400" : "border-green-600"
                            : darkMode ? "border-slate-600" : "border-slate-300"
                        }`}
                        onClick={() => setPagamento("pix")}
                        sx={{
                          backgroundColor: pagamento === "pix" 
                            ? darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)"
                            : darkMode ? "#334155" : "white",
                        }}
                      >
                        <CardContent className="p-4 text-center">
                          <Smartphone size={32} className={`mx-auto mb-2 ${
                            pagamento === "pix" 
                              ? darkMode ? "text-green-400" : "text-green-600"
                              : darkMode ? "text-slate-400" : "text-slate-600"
                          }`} />
                          <Typography 
                            variant="body1" 
                            className={`font-semibold ${
                              pagamento === "pix" 
                                ? darkMode ? "text-green-400" : "text-green-600"
                                : darkMode ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            PIX
                          </Typography>
                          <Typography 
                            variant="caption" 
                            className={darkMode ? "text-slate-400" : "text-slate-600"}
                          >
                            Instantâneo
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Card
                        className={`cursor-pointer border-2 transition-all ${
                          pagamento === "cartao" 
                            ? darkMode ? "border-green-400" : "border-green-600"
                            : darkMode ? "border-slate-600" : "border-slate-300"
                        }`}
                        onClick={() => setPagamento("cartao")}
                        sx={{
                          backgroundColor: pagamento === "cartao" 
                            ? darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)"
                            : darkMode ? "#334155" : "white",
                        }}
                      >
                        <CardContent className="p-4 text-center">
                          <CreditCard size={32} className={`mx-auto mb-2 ${
                            pagamento === "cartao" 
                              ? darkMode ? "text-green-400" : "text-green-600"
                              : darkMode ? "text-slate-400" : "text-slate-600"
                          }`} />
                          <Typography 
                            variant="body1" 
                            className={`font-semibold ${
                              pagamento === "cartao" 
                                ? darkMode ? "text-green-400" : "text-green-600"
                                : darkMode ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            Cartão
                          </Typography>
                          <Typography 
                            variant="caption" 
                            className={darkMode ? "text-slate-400" : "text-slate-600"}
                          >
                            Crédito/Débito
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>

                {/* Auto Recarga */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-opacity-20"
                  style={{ 
                    backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)' 
                  }}
                >
                  <div>
                    <Typography 
                      variant="body1" 
                      className={`font-semibold ${darkMode ? "text-green-400" : "text-green-700"}`}
                    >
                      Recarga Automática
                    </Typography>
                    <Typography 
                      variant="caption" 
                      className={darkMode ? "text-slate-400" : "text-slate-600"}
                    >
                      Recarrega automaticamente quando o saldo estiver baixo
                    </Typography>
                  </div>
                  <Switch
                    checked={autoRecarga}
                    onChange={(e) => setAutoRecarga(e.target.checked)}
                    color="success"
                  />
                </div>

                {/* Mensagens de Status */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert 
                        severity="error" 
                        icon={<AlertCircle />}
                        sx={{
                          backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.1)' : undefined,
                          color: darkMode ? '#fecaca' : undefined,
                        }}
                      >
                        {error}
                      </Alert>
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert 
                        severity="success" 
                        icon={<CheckCircle />}
                        sx={{
                          backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : undefined,
                          color: darkMode ? '#bbf7d0' : undefined,
                        }}
                      >
                        Recarga concluída com sucesso! Cashback de R$ {(valor * 0.05).toFixed(2)} creditado.
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Botão de Recarga */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={abrirModal}
                    disabled={loading || !numCartao || valor <= 0}
                    startIcon={loading ? <Loader2 className="animate-spin" /> : <Zap />}
                    sx={{
                      backgroundColor: darkMode ? "#22c55e" : "#10b981",
                      color: "white",
                      py: 2,
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: darkMode ? "#16a34a" : "#059669",
                      },
                      '&:disabled': {
                        backgroundColor: darkMode ? '#374151' : '#9ca3af',
                      }
                    }}
                  >
                    {loading ? "Processando..." : `Recarregar R$ ${valor.toFixed(2)}`}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Coluna Lateral - Histórico */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card
              sx={{
                background: darkMode
                  ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                borderRadius: 3,
              }}
            >
              <CardContent className="p-6">
                <Typography 
                  variant="h6" 
                  className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? "text-green-400" : "text-green-700"}`}
                >
                  <History size={20} /> Histórico de Recargas
                </Typography>

                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  <AnimatePresence mode="popLayout">
                    {historico.map((recarga, index) => (
                      <motion.div
                        key={recarga.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 rounded-lg border"
                        sx={{
                          backgroundColor: darkMode ? "#334155" : "white",
                          borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Typography 
                            variant="body1" 
                            className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
                          >
                            + R$ {recarga.valor.toFixed(2)}
                          </Typography>
                          <Chip
                            label={recarga.metodo}
                            size="small"
                            sx={{
                              backgroundColor: darkMode ? "rgba(34, 197, 94, 0.2)" : "rgba(16, 185, 129, 0.2)",
                              color: darkMode ? "#22c55e" : "#10b981",
                              fontSize: '0.7rem',
                            }}
                          />
                        </div>
                        <Typography 
                          variant="body2" 
                          className={darkMode ? "text-green-300" : "text-green-600"}
                        >
                          Cashback: R$ {recarga.cashback.toFixed(2)}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          className={darkMode ? "text-slate-400" : "text-slate-600"}
                        >
                          {recarga.data}
                        </Typography>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {historico.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <History size={48} className={`mx-auto mb-3 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
                      <Typography 
                        variant="body2" 
                        className={darkMode ? "text-slate-400" : "text-slate-600"}
                      >
                        Nenhuma recarga realizada
                      </Typography>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>

      {/* Modal de Confirmação */}
      <Dialog 
        open={mostrarModal} 
        onClose={() => setMostrarModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: darkMode
              ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <DialogTitle className="flex items-center gap-3">
            <ArrowLeftRight className={darkMode ? "text-green-400" : "text-green-700"} />
            <Typography 
              variant="h5" 
              className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
            >
              Confirmar Recarga
            </Typography>
          </DialogTitle>

          <DialogContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-opacity-20"
                  style={{ 
                    backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)' 
                  }}
                >
                  <Typography 
                    variant="body2" 
                    className={darkMode ? "text-slate-400" : "text-slate-600"}
                  >
                    Valor
                  </Typography>
                  <Typography 
                    variant="h6" 
                    className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    R$ {valor.toFixed(2)}
                  </Typography>
                </div>

                <div className="p-3 rounded-lg bg-opacity-20"
                  style={{ 
                    backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)' 
                  }}
                >
                  <Typography 
                    variant="body2" 
                    className={darkMode ? "text-slate-400" : "text-slate-600"}
                  >
                    Cashback
                  </Typography>
                  <Typography 
                    variant="h6" 
                    className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    R$ {(valor * 0.05).toFixed(2)}
                  </Typography>
                </div>
              </div>

              <div className="space-y-2">
                <Typography 
                  variant="body2" 
                  className={darkMode ? "text-slate-400" : "text-slate-600"}
                >
                  <strong>Método:</strong> {pagamento === "pix" ? "PIX" : "Cartão"}
                </Typography>
                <Typography 
                  variant="body2" 
                  className={darkMode ? "text-slate-400" : "text-slate-600"}
                >
                  <strong>Cartão:</strong> {numCartao}
                </Typography>
                <Typography 
                  variant="body2" 
                  className={darkMode ? "text-slate-400" : "text-slate-600"}
                >
                  <strong>Total creditado:</strong> R$ {(valor * 1.05).toFixed(2)}
                </Typography>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setMostrarModal(false)}
                    sx={{
                      borderColor: darkMode ? "#475569" : "#cbd5e1",
                      color: darkMode ? "#e2e8f0" : "#475569",
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    Cancelar
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={confirmarRecarga}
                    sx={{
                      backgroundColor: darkMode ? "#22c55e" : "#10b981",
                      color: "white",
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: darkMode ? "#16a34a" : "#059669",
                      }
                    }}
                  >
                    Confirmar
                  </Button>
                </motion.div>
              </div>
            </div>
          </DialogContent>
        </motion.div>
      </Dialog>

      {/* FAB para voltar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Tooltip title="Voltar">
          <Fab
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: darkMode ? "#22c55e" : "#10b981",
              color: "white",
              '&:hover': {
                backgroundColor: darkMode ? "#16a34a" : "#059669",
              }
            }}
          >
            <ArrowLeft />
          </Fab>
        </Tooltip>
      </motion.div>
    </Box>
  );
}